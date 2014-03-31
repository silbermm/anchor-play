name := "anchor-otr"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  //jdbc,
  //anorm,
  cache,
  javaCore,
  "ws.securesocial" %% "securesocial" % "2.1.3",
  "com.typesafe.slick" %% "slick" % "2.0.0",
  "com.typesafe.play" %% "play-slick" % "0.6.0.1",
  "org.virtuslab" %% "unicorn" % "0.4"
)     

play.Project.playScalaSettings
