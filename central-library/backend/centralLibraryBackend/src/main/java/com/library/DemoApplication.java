package com.library;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;




@SpringBootApplication
public class DemoApplication {
	
	//private static SessionFactory sf;
	
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		/*try {
			sf = new Configuration()
					.configure()
					.buildSessionFactory();
		}catch(Throwable ex) {
			System.out.println(ex);
		}
		DemoApplication da = new DemoApplication();
		int userId1 = da.addUser("avi","qwerty","avi@3","civil",new Date());*/
	}
	/*private int addUser(String name, String password, String emailId, String Major, Date date) {
		Session s = sf.openSession();
		Integer userId = null;
		Transaction t = null;
		try {
			t = s.beginTransaction();
			UserDetails user = new UserDetails(name,password,emailId,Major,date);
			userId = (Integer) s.save(user);
			t.commit();
		}catch(HibernateException e){
			if(t!=null) {
				t.rollback();
				e.printStackTrace();
			}
		}finally {
			s.close();
		}
		return userId;
	}*/

}
