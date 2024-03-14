import React, { useEffect, useState } from 'react';
import { TouchableOpacity,View } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds, BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import Colors from '../Colors';


const RewardedAdUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const bannerAdUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8955881905609463/6363795382';  //banner ads
const rewarded = RewardedAd.createForAdRequest(RewardedAdUnitId, {
  keywords: ['fashion', 'clothing'],
});

export const RewardedAds=()=>{
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
        setLoaded(false);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <TouchableOpacity onPress={()=>{rewarded.show()}} style={{width: '100%', height:'100%',flex:1}}>
        {/* Hidden button for showing ad */}
      </TouchableOpacity>
  );
}


export const BannerAds=()=>{
    return (
        <View >
        <BannerAd
        unitId={bannerAdUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
    </View>
    )
}