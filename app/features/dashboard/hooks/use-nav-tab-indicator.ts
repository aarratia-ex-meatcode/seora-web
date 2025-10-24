import { useEffect, useRef } from "react";

function useTabIndicator(activeTab: string) {
  const tabsRef = useRef<HTMLDivElement>(null);

  const updateIndicator = () => {
    const tabsElement = tabsRef.current;

    if (!tabsElement) {
      return;
    }

    const activeTabSelector = `[data-state="active"]`;
    const activeTabElement = tabsElement.querySelector(activeTabSelector) as HTMLElement;

    if (!activeTabElement) {
      return;
    }

    const { offsetLeft, offsetWidth } = activeTabElement;
    tabsElement.style.setProperty("--indicator-width", `${offsetWidth}px`);
    tabsElement.style.setProperty("--indicator-left", `${offsetLeft}px`);
  };

  useEffect(() => {
    updateIndicator();

    const handleResize = () => updateIndicator();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

  return tabsRef;
}

export { useTabIndicator };

