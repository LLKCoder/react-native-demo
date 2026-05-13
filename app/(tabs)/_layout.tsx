import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS, Platform, type ColorValue } from 'react-native';

import { colors } from '@/theme/tokens';

const tabTintColor: ColorValue =
  Platform.OS === 'ios'
    ? DynamicColorIOS({
        light: colors.primary,
        dark: colors.primary,
      })
    : colors.primary;

const tabLabelColor: ColorValue =
  Platform.OS === 'ios'
    ? DynamicColorIOS({
        light: colors.text,
        dark: colors.darkText,
      })
    : colors.text;

const tabBarBackgroundColor: ColorValue | undefined =
  Platform.OS === 'ios'
    ? undefined
    : 'rgba(255, 248, 245, 0.96)';

const tabShadowColor: ColorValue =
  Platform.OS === 'ios'
    ? DynamicColorIOS({
        light: colors.border,
        dark: colors.darkBorder,
      })
    : colors.border;

const tabIndicatorColor: ColorValue =
  Platform.OS === 'android' ? 'rgba(226, 153, 71, 0.18)' : colors.primary;

const tabRippleColor: ColorValue =
  Platform.OS === 'android' ? 'rgba(226, 153, 71, 0.14)' : colors.primary;

const selectedLabelColor: ColorValue =
  Platform.OS === 'ios'
    ? DynamicColorIOS({
        light: colors.primary,
        dark: colors.primary,
      })
    : colors.primary;

const selectedLabelStyle = {
  color: selectedLabelColor,
};

export default function TabLayout() {
  return (
    <NativeTabs
      backgroundColor={tabBarBackgroundColor}
      blurEffect="systemMaterial"
      disableTransparentOnScrollEdge
      indicatorColor={tabIndicatorColor}
      labelStyle={{
        color: tabLabelColor,
        fontSize: 11,
        fontWeight: '700',
      }}
      labelVisibilityMode="labeled"
      rippleColor={tabRippleColor}
      shadowColor={tabShadowColor}
      tintColor={tabTintColor}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label selectedStyle={selectedLabelStyle}>首页</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md="home"
          sf={{
            default: 'house',
            selected: 'house.fill',
          }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="courses">
        <NativeTabs.Trigger.Label selectedStyle={selectedLabelStyle}>课程</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md="menu_book"
          sf={{
            default: 'book',
            selected: 'book.fill',
          }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="study">
        <NativeTabs.Trigger.Label selectedStyle={selectedLabelStyle}>学习</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md="play_circle"
          sf={{
            default: 'play.circle',
            selected: 'play.circle.fill',
          }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label selectedStyle={selectedLabelStyle}>我的</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md="person"
          sf={{
            default: 'person',
            selected: 'person.fill',
          }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
