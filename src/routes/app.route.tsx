import { Tabs } from 'expo-router/tabs';

export function AppNavigator() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
