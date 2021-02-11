#
# TABLE STRUCTURE FOR: players
#

DROP TABLE IF EXISTS `players`;

CREATE TABLE `players` (
  `name` varchar(100) NOT NULL,
  `score` int(9) NOT NULL,
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `players` (`name`, `score`) VALUES ('accusamus', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('accusantium', 8);
INSERT INTO `players` (`name`, `score`) VALUES ('alias', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('animi', 2);
INSERT INTO `players` (`name`, `score`) VALUES ('architecto', 6);
INSERT INTO `players` (`name`, `score`) VALUES ('aut', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('autem', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('beatae', 9);
INSERT INTO `players` (`name`, `score`) VALUES ('blanditiis', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('consequatur', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('consequuntur', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('corrupti', 8);
INSERT INTO `players` (`name`, `score`) VALUES ('cumque', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('cupiditate', 4);
INSERT INTO `players` (`name`, `score`) VALUES ('debitis', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('dignissimos', 2);
INSERT INTO `players` (`name`, `score`) VALUES ('dolor', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('dolorem', 8);
INSERT INTO `players` (`name`, `score`) VALUES ('dolores', 8);
INSERT INTO `players` (`name`, `score`) VALUES ('doloribus', 4);
INSERT INTO `players` (`name`, `score`) VALUES ('dolorum', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('ducimus', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('ea', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('earum', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('enim', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('esse', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('est', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('et', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('eum', 4);
INSERT INTO `players` (`name`, `score`) VALUES ('eveniet', 9);
INSERT INTO `players` (`name`, `score`) VALUES ('ex', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('expedita', 9);
INSERT INTO `players` (`name`, `score`) VALUES ('explicabo', 8);
INSERT INTO `players` (`name`, `score`) VALUES ('facere', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('facilis', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('hic', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('id', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('illo', 8);
INSERT INTO `players` (`name`, `score`) VALUES ('illum', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('in', 8);
INSERT INTO `players` (`name`, `score`) VALUES ('incidunt', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('inventore', 6);
INSERT INTO `players` (`name`, `score`) VALUES ('ipsam', 4);
INSERT INTO `players` (`name`, `score`) VALUES ('iure', 4);
INSERT INTO `players` (`name`, `score`) VALUES ('iusto', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('labore', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('laudantium', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('magnam', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('magni', 9);
INSERT INTO `players` (`name`, `score`) VALUES ('minus', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('molestiae', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('necessitatibus', 4);
INSERT INTO `players` (`name`, `score`) VALUES ('neque', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('nihil', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('nisi', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('nobis', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('non', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('nulla', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('numquam', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('odit', 8);
INSERT INTO `players` (`name`, `score`) VALUES ('officiis', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('perferendis', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('placeat', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('possimus', 9);
INSERT INTO `players` (`name`, `score`) VALUES ('praesentium', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('provident', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('quae', 4);
INSERT INTO `players` (`name`, `score`) VALUES ('quam', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('quas', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('qui', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('quia', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('quidem', 4);
INSERT INTO `players` (`name`, `score`) VALUES ('quis', 2);
INSERT INTO `players` (`name`, `score`) VALUES ('quisquam', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('quo', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('quos', 4);
INSERT INTO `players` (`name`, `score`) VALUES ('ratione', 6);
INSERT INTO `players` (`name`, `score`) VALUES ('rem', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('repellat', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('repellendus', 8);
INSERT INTO `players` (`name`, `score`) VALUES ('reprehenderit', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('repudiandae', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('rerum', 9);
INSERT INTO `players` (`name`, `score`) VALUES ('saepe', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('sapiente', 8);
INSERT INTO `players` (`name`, `score`) VALUES ('sed', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('sequi', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('sint', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('sit', 9);
INSERT INTO `players` (`name`, `score`) VALUES ('sunt', 4);
INSERT INTO `players` (`name`, `score`) VALUES ('suscipit', 4);
INSERT INTO `players` (`name`, `score`) VALUES ('tempora', 7);
INSERT INTO `players` (`name`, `score`) VALUES ('tenetur', 6);
INSERT INTO `players` (`name`, `score`) VALUES ('ullam', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('ut', 0);
INSERT INTO `players` (`name`, `score`) VALUES ('vel', 1);
INSERT INTO `players` (`name`, `score`) VALUES ('veniam', 2);
INSERT INTO `players` (`name`, `score`) VALUES ('voluptas', 3);
INSERT INTO `players` (`name`, `score`) VALUES ('voluptatibus', 5);
INSERT INTO `players` (`name`, `score`) VALUES ('voluptatum', 1);


