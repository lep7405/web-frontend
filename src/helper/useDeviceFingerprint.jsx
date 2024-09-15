import { useState, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const useDeviceFingerprint = () => {
  const [visitorId, setVisitorId] = useState("");
  const [combinedComponents, setCombinedComponents] = useState("");
  const [opentErrorAxios, setOpenErrorAxios] = useState(false);
  const [opentErrorAxiosText, setOpenErrorAxiosText] = useState("");

  useEffect(() => {
    const getDeviceFingerprint = async () => {
      try {
        // Initialize FingerprintJS
        const fp = await FingerprintJS.load();
        const result = await fp.get();

        // Extract visitorId and components
        const { visitorId, components } = result;
        setVisitorId(visitorId);

        // Combine component values into a single string
        const combinedString = Object.values(components)
          .map((component) => JSON.stringify(component.value))
          .join("");
        setCombinedComponents(combinedString);
      } catch (error) {
        console.error("Error fetching fingerprint:", error);
        setOpenErrorAxios(true);
        setOpenErrorAxiosText("Error fetching fingerprint data");
      }
    };

    getDeviceFingerprint();
  }, []);

  return { visitorId, combinedComponents, opentErrorAxios, opentErrorAxiosText };
};

export default useDeviceFingerprint;
