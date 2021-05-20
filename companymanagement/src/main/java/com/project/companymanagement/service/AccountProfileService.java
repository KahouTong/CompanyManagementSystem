package com.project.companymanagement.service;

import java.util.List;
import java.util.Optional;

import com.project.companymanagement.entities.AccountProfile;


public interface AccountProfileService {

	void saveProfile(AccountProfile accProfile);
	
	void deleteProfile(int id);
	
	public List<AccountProfile> getProfile();
	
	public AccountProfile getSelectedProfile(int id);

	Optional<AccountProfile> editProfile(AccountProfile accProfile);

	AccountProfile getByEmail(String email);
	
}
