package database;

import org.specs2.mutable._
import play.api.test._
import play.api.test.Helpers._
import play.api.Play.current
import models._
import play.api.db.slick.Config.driver.simple._
import play.api.db.slick.DB

class UserSpec extends Specification {
  
  "The user database" should {
    
    "create a new user" in new WithApplication {
      DB.withSession{ implicit session => 
        val u = new User( None,Option("Matt"),Option("Silbernagel"),"silbermm","1233")
        Users.insert(u); 
        val nU  = Users.findByIdentity("1233");
        val firstName = nU.get.firstName.getOrElse("No firstname is defined");
        firstName must be equalTo "Matt";
        val id = nU.get.id.getOrElse(Nil)
        id must not beNull
      }
    }

    "update a user" in new WithApplication {
      DB.withSession{ implicit session =>
        val u = new User( None,Option("Matt"),Option("Silbernagel"),"silbermm","1233")
        Users.insert(u); 
        val nU  = Users.findByIdentity("1233");
        val firstName = nU.get.firstName.getOrElse("No firstname is defined");
        firstName must be equalTo "Matt";
        val id : Long = nU.get.id.getOrElse(0)
        id must not be equalTo(0)
        
        val newUser = new User(Option(id), Option("Matthew"),Option("Silbernagel"),"silbermm","1233")
        Users.update(newUser);
        val nU2  = Users.findByIdentity("1233");
        val firstName2 = nU2.get.firstName.getOrElse("No firstname is defined");
        firstName2 must be equalTo "Matthew"
        
        val id2 : Long = nU2.get.id.getOrElse(0)
        id must be equalTo(id2)
      }
    }

  }
  
}
