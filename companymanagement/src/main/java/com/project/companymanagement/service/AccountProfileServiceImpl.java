package com.project.companymanagement.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.project.companymanagement.entities.AccountProfile;
import com.project.companymanagement.repository.AccountProfileRepo;


@Service
@Transactional
public class AccountProfileServiceImpl implements AccountProfileService{
	
	@Autowired
	AccountProfileRepo profileRepo;

	@Override
	public void saveProfile(AccountProfile accProfile) {
		profileRepo.save(accProfile);
	}

	@Override
	public void deleteProfile(int id) {
		profileRepo.deleteById((long) id);
	}

	@Override
	public List<AccountProfile> getProfile() {
		return (List<AccountProfile>) profileRepo.findAll();
	}

	@Override
	public AccountProfile getSelectedProfile(int id) {
		Optional<AccountProfile> entityOptional = profileRepo.findById((long) id);
		if (entityOptional.isPresent()) {
			AccountProfile Entity = entityOptional.get();
			return Entity;
		}
		return null;
	}
	
	@Override
	public Optional<AccountProfile> editProfile(AccountProfile accProfile) {
		profileRepo.setUserInfoById(accProfile.getEmployeename(), accProfile.getPassword(), accProfile.getEmail(), accProfile.getEmployeeid());
		return profileRepo.findById(accProfile.getEmployeeid());
	}

	@Override
	public AccountProfile getByEmail(String email) {
		return profileRepo.findByEmail(email);
	}

}
