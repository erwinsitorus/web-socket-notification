package com.bvk.notification.resource;

import com.bvk.notification.model.User;
import com.bvk.notification.model.Response;
import com.bvk.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserController {

    @Autowired
    private NotificationService notificationService;


    @MessageMapping("/user")
    @SendTo("/topic/user")
    public Response getUser(User user) {

        return new Response("Hi " + user.getName());
    }

    @RequestMapping(value = "/send-message", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> add(@RequestParam("greeting") String greeting){
        notificationService.notify(new Response(greeting));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
