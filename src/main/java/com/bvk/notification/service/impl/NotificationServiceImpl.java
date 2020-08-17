package com.bvk.notification.service.impl;

import com.bvk.notification.model.User;
import com.bvk.notification.model.Response;
import com.bvk.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @Override
    public void notify(Response response){
        messagingTemplate.convertAndSend("/topic/user" , response);
    }

}
