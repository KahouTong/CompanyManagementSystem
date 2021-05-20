package com.project.companymanagement.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "accountprofiles")
@Getter
@Setter
public class AccountProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long employeeid;
	
	private String employeename;
	
	private String password;
	
	private String email;
	
	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Activity> activity;
}
