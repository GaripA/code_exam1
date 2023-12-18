import express from 'express';
import Task from './models/Task.js';

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.post("/add", async function (req, res) {
  const contenu = new Task();
  contenu.name = req.body.name;
  contenu.quantity = req.body.quantity ;
  contenu.purchased = 0 ;
  await contenu.save();
  res.redirect('/');
});

app.get("/delete/:id", async function (req, res) {
  await Task.delete({ id: req.params.id });
  res.redirect('/');
});

app.get("/acheter/:id", async function (req, res) {
  const contenu = await Task.load({ id: req.params.id });
  contenu.purchased = 1;
  await contenu.save();
  res.redirect('/');
});

app.get("/", async function (req, res) {
  const contenu = await Task.loadMany();
  res.render('listTasks.ejs', {contenu});
});


/*app.get("/", async function (req, res) {
  const tasks = await Task.loadMany({bougth : 0 });
  const owned = await Task.loadMany({bougth: 1 });
  res.render('listTasks.ejs', {tasks,owned});
});*/

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
