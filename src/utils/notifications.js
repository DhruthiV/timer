import { toast } from "sonner";

//App Start
export function requestNotificationPermission(){
    if(Notification.permission === "default"){
        Notification.requestPermission()
    }
    
}

export function notifyUser() {
    // console.log(document.visibilityState)
  if (document.visibilityState === "visible") {
    notifyInAppTimerComplete();
  } else {
    notifyBrowserTimerComplete();
  }
}

export function notifyInAppTimerComplete(){
    toast("Timer Completed", {
        description: "Hey! You finished this work!"
    })
}

export function notifyBrowserTimerComplete(){
    if(Notification.permission === "granted"){
        new Notification("Timer Completed!", {
            body: "Completed Your Timer!",
            icon:"src/assets/icon.png"
        })
    }
    
}

