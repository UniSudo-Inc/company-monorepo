// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({
  style,
  ...rest
}: Readonly<IconProps<ComponentProps<typeof Ionicons>['name']>>): React.ReactElement {
  return <Ionicons size={28} style={[styles.icon, style]} {...rest} />;
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});
