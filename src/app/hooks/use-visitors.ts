"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { ref, push, query, limitToLast, get, serverTimestamp } from "firebase/database";
import { COUNTRY_CENTROIDS } from "../data/country-centroids";

export interface Visitor {
  country: string;
  timestamp: number;
}

export interface CountryMarker {
  country: string;
  lat: number;
  lng: number;
  count: number;
  isCurrent: boolean;
}

export function useVisitors() {
  const [markers, setMarkers] = useState<CountryMarker[]>([]);

  useEffect(() => {
    let currentCountry: string | null = null;

    // Geolocate current visitor and log them (once per day)
    const lastLogged = localStorage.getItem("visitor-logged");
    const oneDayMs = 24 * 60 * 60 * 1000;
    const shouldLog = !lastLogged || Date.now() - Number(lastLogged) > oneDayMs;
    const geoPromise = fetch("https://ipinfo.io/json")
      .then((res) => res.json())
      .then((data) => {
        if (data.country) {
          currentCountry = data.country;
          if (shouldLog) {
            push(ref(db, "visitors"), {
              country: data.country,
              timestamp: serverTimestamp(),
            });
            localStorage.setItem("visitor-logged", String(Date.now()));
            console.log(
              "set local storage: visitor-logged",
              String(Date.now()),
            );
          }
        }
      })
      .catch(() => {});

    // Fetch the last 500 visitors, then build markers
    const visitorsRef = query(ref(db, "visitors"), limitToLast(500));
    const dataPromise = get(visitorsRef).then((snapshot) => {
      const entries: Visitor[] = [];
      snapshot.forEach((child) => {
        entries.push(child.val());
      });
      return entries;
    });

    Promise.all([geoPromise, dataPromise]).then(([, visitors]) => {
      // Count visitors per country
      const counts = new Map<string, number>();
      for (const v of visitors) {
        counts.set(v.country, (counts.get(v.country) ?? 0) + 1);
      }

      // Build one marker per country
      const result: CountryMarker[] = [];
      for (const [country, count] of counts) {
        const centroid = COUNTRY_CENTROIDS[country];
        if (centroid) {
          result.push({
            country,
            lat: centroid[0],
            lng: centroid[1],
            count,
            isCurrent: country === currentCountry,
          });
        }
      }
      setMarkers(result);
    });
  }, []);

  return { markers };
}
