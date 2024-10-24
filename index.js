const express = require("express");
const mysql = require("mysql");
const app = express();
const expressPort = 3000;

app.use(express.json());

const dataBAse = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "caca2",
});

dataBAse.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("BRAVO, VOUS ETES CONNECTE A LA DATABASE !");
  }
});

app.listen(expressPort, () => {
  console.log("MON SERVEUR TOURNE SUR LE PORT :", expressPort);
});

app.get("/getItem", (req, res) => {
  const sql = "SELECT * FROM item;";
  dataBAse.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "ERREUR DU SERVEUR" });
    } else {
      return res.status(200).json(result);
    }
  });
});

app.post("/createItem", (req, res) => {
  const { name, price, id_categorie, description } = req.body;
  const sql =
    "INSERT INTO item (name, price, id_categorie, description) VALUES (? , ? , ? , ?)";
  dataBAse.query(
    sql,
    [name, price, id_categorie, description],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "ERREUR DU SERVEUR" });
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

app.put("/modifierItem/:id", (req, res) => {
  const { name, price, id_categorie, description } = req.body;
  const { id } = req.params;
  const sql =
    "UPDATE item SET name = ?, price = ?, id_categorie = ?, description = ? WHERE id = ?";
  dataBAse.query(
    sql,
    [name, price, id_categorie, description, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "ERREUR DU SERVEUR" });
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

app.delete("/deleteItem/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM item WHERE id = ?";
  dataBAse.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "ERREUR DU SERVEUR" });
    } else {
      return res.status(200).json(result);
    }
  });
});

app.get("/getItem2", (req, res) => {
  const sql = `
    SELECT item.id AS item_id, categorie.id AS categorie_id
    FROM item 
    INNER JOIN item_categorie ON item.id = item_categorie.item_id
    INNER JOIN categorie ON item_categorie.categorie_id = categorie.id;
  `;
  dataBAse.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "ERREUR DU SERVEUR" });
    } else {
      return res.status(200).json(result);
    }
  });
});

app.get("/getItem3/:categorie", (req, res) => {
  const { categorie } = req.params;
  const sql = `
    SELECT item.name 
    FROM item 
    INNER JOIN item_categorie ON item.id = item_categorie.item_id
    INNER JOIN categorie ON item_categorie.categorie_id = categorie.id
    WHERE categorie.name = ?;
  `;
  dataBAse.query(sql, [categorie], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "ERREUR DU SERVEUR" });
    } else {
      return res.status(200).json(result);
    }
  });
});

app.post("/createItem2", (req, res) => {
  const { name, price, description, categorie_id } = req.body;
  const sql = `INSERT INTO item (name, price, description) VALUES (? , ? , ?);`;
  dataBAse.query(sql, [name, price, description], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "ERREUR DU SERVEUR lors de l'insertion de l'article" });
    }
    const caca = result.insertId;
    const sqlcaca = `INSERT INTO item_categorie (item_id, categorie_id) VALUES (?, ?);`;
    dataBAse.query(sqlcaca, [caca, categorie_id], (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({
            error: "ERREUR DU SERVEUR lors de l'insertion dans item_categorie",
          });
      } else {
        return res.status(200).json({ message: "C'est good chef" });
      }
    });
  });
});

app.delete("/deleteItem2/:categorie", (req, res) => {
  const { categorie } = req.params;
  const sql = `
    DELETE item 
    FROM item 
    INNER JOIN item_categorie ON item.id = item_categorie.item_id
    INNER JOIN categorie ON item_categorie.categorie_id = categorie.id
    WHERE categorie.name = ?;
  `;
  dataBAse.query(sql, [categorie], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "ERREUR DU SERVEUR" });
    } else {
      return res.status(200).json({ message: "C'est good chef." });
    }
  });
});
