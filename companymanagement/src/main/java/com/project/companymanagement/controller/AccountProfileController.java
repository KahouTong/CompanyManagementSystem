package com.project.companymanagement.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.project.companymanagement.config.ControllerException;
import com.project.companymanagement.entities.AccountProfile;
import com.project.companymanagement.service.AccountProfileService;

@RestController
@CrossOrigin(origins = "http://localhost:4200" , maxAge = 3600)
@RequestMapping("AccountProfile")
public class AccountProfileController {
	
	@Autowired
	AccountProfileService accService;
	
	@GetMapping("/allProfile")
	public List<AccountProfile> getProfile() {
		List<AccountProfile> accountProfile = null;
		try {
			accountProfile = accService.getProfile();
			if (accountProfile == null) {
				throw new NullPointerException("/AccountProfile/allProfile" + ", profile is null or empty");
			}
		} catch (Exception e) {
			throw new ControllerException("/AccountProfile/allProfile", e.getMessage());
		}

		return accountProfile;
	}
	
	@RequestMapping(method=RequestMethod.GET,value="findProfileById/{Id}")
	public AccountProfile getProfileById(@PathVariable("Id") int id) {
		AccountProfile accountProfile = null;
		try {
			accountProfile = accService.getSelectedProfile(id);
			if (accountProfile == null) {
				throw new NullPointerException("/AccountProfile/findProfileById" + ", profile selected is null or empty");
			}
		} catch (Exception e) {
			throw new ControllerException("/AccountProfile/findProfileById", e.getMessage());
		}
		return accountProfile;	
	}
	
	@RequestMapping(method=RequestMethod.GET,value="findProfileByEmail/{email}")
	public AccountProfile findByEmail(@PathVariable("email") String email) {
		AccountProfile accountProfile = null;
		try {
			accountProfile = accService.getByEmail(email);
			if (accountProfile == null) {
				throw new NullPointerException("/AccountProfile/findProfileById" + ", profile selected is null or empty");
			}
		} catch (Exception e) {
			throw new ControllerException("/AccountProfile/findProfileById", e.getMessage());
		}
		return accountProfile;	
	}
	
	@RequestMapping(value="/saveEmployee",method=RequestMethod.POST)
	public void saveEmployee(@RequestBody AccountProfile profile)
	{
		try {
			if (profile == null)  {
				throw new NullPointerException("/AccountProfile/saveEmployee" + ", profile is null or empty");
			}
			accService.saveProfile(profile);
			
		} catch (Exception e) {
			throw new ControllerException("/AccountProfile/saveEmployee", e.getMessage());
		}		
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="deleteProfileById/{Id}")
	public void deleteProfileById(@PathVariable("Id") int id) 
	{
		try {
			accService.deleteProfile(id);	
		} catch (Exception e) {
			throw new ControllerException("/AccountProfile/deleteProfileById", e.getMessage());
		}		
	}
	
	@RequestMapping(value="/editEmployee",method=RequestMethod.PUT)
	public Optional<AccountProfile> editEmployee(@RequestBody AccountProfile profile)
	{
		Optional<AccountProfile> accountProfile = null;
		try {
			if (profile == null)  {
				throw new NullPointerException("/AccountProfile/editEmployee" + ", profile is null or empty");
			}
			accountProfile = accService.editProfile(profile);
		} catch (Exception e) {
			throw new ControllerException("/AccountProfile/editEmployee", e.getMessage());
		}	
		
		return accountProfile;
	}
}
