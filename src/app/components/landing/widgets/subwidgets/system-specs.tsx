"use client";

function getSpecs() {
  if (typeof navigator === "undefined") return [];

  const nav = navigator as Navigator & { deviceMemory?: number; userAgentData?: { platform: string } };

  const specs: { label: string; value: string }[] = [];

  if (nav.userAgentData?.platform) specs.push({ label: "SYS_PLATFORM", value: nav.userAgentData.platform });
  if (nav.hardwareConcurrency) specs.push({ label: "SYS_CORES", value: String(nav.hardwareConcurrency) });
  if (nav.deviceMemory) specs.push({ label: "SYS_MEM", value: `${nav.deviceMemory}GB` });

  return specs;
}

function SystemSpecs() {
  const specs = getSpecs();

  if (specs.length === 0) return null;

  return (
    <span suppressHydrationWarning>
      {specs.map((s) => `${s.label}: ${s.value}`).join(" | ")}
    </span>
  );
}

export default SystemSpecs;
