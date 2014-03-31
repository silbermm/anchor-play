package models

import java.util.Date
import java.sql.{ Date => SqlDate }
import play.api.Play.current
import play.api.db.slick.Config.driver.simple._
import scala.slick.lifted.{Tag}
import java.sql.Timestamp

case class User(id: Option[Long] = None, firstName: Option[String] = None, lastName: Option[String] = None, userName: String, identityId: String)

class Users(tag: Tag) extends Table[User](tag, "COMPUTER") {

  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def firstName = column[String]("firstName", O.Nullable)
  def lastName = column[String]("lastName", O.Nullable)
  def userName = column[String]("userName", O.NotNull)
  def identityId = column[String]("identityId", O.NotNull)

  def * = (id.?, firstName.?, lastName.?, userName, identityId) <> (User.tupled, User.unapply _)

}

object Users {

  val users = TableQuery[Users]

  def findByIdentity(identityId: String)(implicit s: Session): Option[User] =
    users.where(_.identityId === identityId).firstOption

  def findById(id: Long)(implicit s: Session): Option[User] =
    users.where(_.id === id).firstOption

  def insert(user: User)(implicit s: Session) {
    users.insert(user)
  }

  def update(user: User)(implicit s: Session) {
    users.update(user);
  }
}