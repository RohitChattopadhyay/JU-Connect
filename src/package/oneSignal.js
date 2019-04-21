import React from 'react'
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import axios from 'axios'
const cookies = new Cookies();

export class pusher extends React.Component {
  static setup(){
    if(!pusher.checkSupport()){
      toast.error("Sorry! Notification is not supported, try another browser")
      return;
    }
    
    OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {
      if (isEnabled){
        pusher.setExternalID()
        return true
      }
      else
        {
          toast.warn("Provide permission to send notifications to avail our services")
          OneSignal.registerForPushNotifications().then(function(res){
              pusher.setExternalID()
            }
          )
          return false
        }
    }); 
  }

  static basicAuth(){
    let roll = Buffer.from(cookies.get('identifier')||' ', 'base64').toString()
    OneSignal.getExternalUserId().then(function(res){
      if(res===roll){
        return true
      }
      return false
      }
    )
  }

  static getDeviceID(){
    OneSignal.push(function() {
        OneSignal.getUserId().then(function(res){
            return res
          }
        )
      }
    )
  }

  static getExternalID(){
    OneSignal.push(function() {
        OneSignal.getExternalUserId().then(function(res){
            return res
          }
        )
      }
    )
  }

  static setExternalID(){
    let roll = Buffer.from(cookies.get('identifier')||' ', 'base64').toString()
    OneSignal.getExternalUserId().then(function(res){
      // console.log(res)
        if(res==undefined || res == null){
          OneSignal.setExternalUserId(roll)
          OneSignal.getUserId().then(function(res){
            axios.post('/api/auth/signup', {
              roll: roll,
              uid: res
            })
            .then(function (response) {
                toast.info("Welcome to JU Connect")
              }
            )
            .catch(function (error) {
              setTimeout(function(){
                cookies.remove('identifier', { path: '/' })
                location.reload();
              }, 1000);
            });
            return res
            }
          )
        }

        else if(res==roll){
          OneSignal.getUserId().then(function(res){
            axios.post('/api/auth/login', {
              roll: roll,
              uid: res
            })
            .then(function (response) {
                toast.info("Welcome back!!")
              }
            )
            .catch(function (error) {
              setTimeout(function(){
                cookies.remove('identifier', { path: '/' })
                location.reload();
              }, 1000);
            });
            return res
            }
          )
        }
        else{
          toast.error("Invalid Login")
          setTimeout(function(){
            cookies.remove('identifier', { path: '/' })
            location.reload();
          }, 1000);
        }
      }
    )
  }

  static checkSupport(){
    return OneSignal.isPushNotificationsSupported()
  }

  static checkSubscription(){
    OneSignal.push(function() {                   
      OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {
        if (isEnabled)
          return true
        else
          return false
      });
    });
  }

  static selfNotification(title,content){
      OneSignal.push(function() {
        OneSignal.sendSelfNotification(title,content);
      }
    )
  }
}