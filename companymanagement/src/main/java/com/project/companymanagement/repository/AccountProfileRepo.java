package com.project.companymanagement.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.companymanagement.entities.AccountProfile;

@Repository
public interface AccountProfileRepo extends JpaRepository<AccountProfile, Long>{
	
	@Transactional
	@Modifying
	@Query("update AccountProfile u set u.employeename = :employeename, u.password = :password, u.email = :email where u.employeeid = :employeeid")
	void setUserInfoById(String employeename, String password, String email, Long employeeid);
	
	@Query(value = "select * from accountprofiles d where d.email = :email", nativeQuery = true)
	AccountProfile findByEmail(String email);

}
