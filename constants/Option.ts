import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ExternalPathString } from 'expo-router';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface ProfileMenuItem {
  name: string;
  path: ExternalPathString;
  icon: IconName;
}

export const ProfileMenu: ProfileMenuItem[] = [
  {
    name: 'My Courses',
    path: '/courses' as ExternalPathString,
    icon: 'book' as IconName,
  },
  // Add other menu items following the same pattern
]; 