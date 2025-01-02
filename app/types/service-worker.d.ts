interface ServiceWorkerRegistration {
  pushManager: PushManager;
  update(): Promise<void>;
  unregister(): Promise<boolean>;
  showNotification(title: string, options?: NotificationOptions): Promise<void>;
}

interface WindowEventMap {
  'push': PushEvent;
  'notificationclick': NotificationEvent;
  'install': ExtendableEvent;
  'activate': ExtendableEvent;
}

interface ServiceWorkerGlobalScope {
  registration: ServiceWorkerRegistration;
}
