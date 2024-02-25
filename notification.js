import PushNotification, { PushNotificationObject } from "react-native-push-notification";
class notification{
    constructor(){
            PushNotification.configure({
                onRegister:function(token){
                    //console.log('Token:',token);
                },

                onNotification:function(notification){
                    //console.log('Notification:',notification);
                },
                popInitialNotification:true,
                requestPermissions:false,
            });

            PushNotification.createChannel({
                channelId:'reminders',
                channelName:'Task reminder notifications',
                channelDescription:'reminder for any tasks',
            },()=>{});

            PushNotification.getScheduledLocalNotifications(rn=>{
                console.log('SN ---',sn)
            });
    }

    schduleNotification(date){
        PushNotification.localNotificationSchedule({
            channelId:'reminders',
            titile:'Reminders!',
            message:"don't forget to enter your detail!",
            date,
        });
    }
}
export default new notification();