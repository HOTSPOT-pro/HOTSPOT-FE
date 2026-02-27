import { useEffect, useState } from 'react';

export type NotificationSettings = Record<string, boolean>;

export const useNotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSettings>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setSettings({
          'family-policy': false,
          'gift-data': true,
          'service-block': true,
          threshold: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const updateSetting = async (id: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: checked }));

    try {
      console.log(`API 전송: ${id} -> ${checked}`);
    } catch (error) {
      setSettings((prev) => ({ ...prev, [id]: !checked }));
    }
  };

  return { isLoading, settings, updateSetting };
};
