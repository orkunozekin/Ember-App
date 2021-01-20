package com.socialapp.controller;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.socialapp.dao.UserRepo;
import com.socialapp.model.User;

@RestController
@CrossOrigin(origins = "*")
public class SessionController {

	private UserRepo userRepo;
	private Logger logger = Logger.getLogger(SessionController.class);

	public SessionController() {

	}

	@Autowired
	public SessionController(UserRepo userRepo) {
		super();
		this.userRepo = userRepo;
	}

	@PostMapping(value = "/getUser")
	public User getLoggedInUser(HttpSession session, @RequestBody User user) {
		System.out.println(user.getUserId());
		return userRepo.selectUserById(user.getUserId());
	}

	@PostMapping(value = "/login")
	public User login(HttpSession session, @RequestBody User user) throws IOException {

		// we need a getUserByEmailAndPassword method to call here
		System.out.println(user.getEmail());
		System.out.println(user);
		System.out.println("logged in user: " + userRepo.selectUserByEmail(user.getEmail()));
		User loggedinUser = userRepo.selectUserByEmail(user.getEmail());
		// set the user to the session.
		if (loggedinUser != null) {
		logger.info("User logged in :" + user.getEmail());
			session.setAttribute("loggedInUser", loggedinUser);
		}

	return loggedinUser;

	}

	@GetMapping(value = "/logout")
	public String logout(HttpSession session) {
		logger.info("User logged out");
		session.invalidate();
		
		return "Logout successful";
	}
}
