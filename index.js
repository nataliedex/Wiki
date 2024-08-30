import express from "express";
import ejs from "ejs";


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));



let articles = [
    {title:"Rainbows",
    content:"Lorem ipsum odor amet, consectetuer adipiscing elit. Pretium a commodo pulvinar tempus platea cras? Lobortis quam sapien eleifend velit, magna inceptos. Ultrices suspendisse platea sit et ex; inceptos libero ornare neque? Dignissim magnis nisl quam augue fringilla. Nec varius taciti ultricies magnis turpis finibus. Per ex elit, nunc consequat at cursus taciti. Amet cras feugiat vulputate nunc dis lacus dictum. Adis ultrices dolor fermentum nullam rutrum."
    },
    {title:"Lollipops",
    content:"Lorem ipsum odor amet, consectetuer adipiscing elit. Pretium a commodo pulvinar tempus platea cras? Lobortis quam sapien eleifend velit, magna inceptos. Ultrices suspendisse platea sit et ex; inceptos libero ornare neque? Dignissim magnis nisl quam augue fringilla. Nec varius taciti ultricies magnis turpis finibus. Per ex elit, nunc consequat at cursus taciti. Amet cras feugiat vulputate nunc dis lacus dictum. Adis ultrices dolor fermentum nullam rutrum."
    },
    {title:"Unicorns",
    content:"Lorem ipsum odor amet, consectetuer adipiscing elit. Pretium a commodo pulvinar tempus platea cras? Lobortis quam sapien eleifend velit, magna inceptos. Ultrices suspendisse platea sit et ex; inceptos libero ornare neque? Dignissim magnis nisl quam augue fringilla. Nec varius taciti ultricies magnis turpis finibus. Per ex elit, nunc consequat at cursus taciti. Amet cras feugiat vulputate nunc dis lacus dictum. Adis ultrices dolor fermentum nullam rutrum."
    },
    {title:"Moonbeams",
    content:"Lorem ipsum odor amet, consectetuer adipiscing elit. Pretium a commodo pulvinar tempus platea cras? Lobortis quam sapien eleifend velit, magna inceptos. Ultrices suspendisse platea sit et ex; inceptos libero ornare neque? Dignissim magnis nisl quam augue fringilla. Nec varius taciti ultricies magnis turpis finibus. Per ex elit, nunc consequat at cursus taciti. Amet cras feugiat vulputate nunc dis lacus dictum. Adis ultrices dolor fermentum nullam rutrum."
    },
];

app.get("/", (req, res) => {
    res.render("index.ejs", { articles: articles });
});

app.get("/submit", (req,res)=>{
    const title = req.query.search;
    const article = articles.find(a => a.title === title);
    if (article) {
        res.render("index.ejs", { articles: articles, selectedArticle: article });
    } else {
        res.status(404).send("Article not found");
    }
    
});

app.get("/random", (req, res) => {
    const title = articles[Math.floor(Math.random()*articles.length)].title;
    const article = articles.find(a => a.title === title);
    if (article) {
        res.render("index.ejs", { articles: articles, selectedArticle: article });
    } else {
        res.status(404).send("Article not found");
    }
    
});

app.get("/article", (req, res) => {
    const title = req.query.title;
    const article = articles.find(a => a.title === title);
    if (article) {
         
        res.json(article);
    } else {
        res.status(404).send("Article not found");
    }
    
});

//edit articles (still can't figure out how to get clicked articles to work)
app.get("/edit",(req, res)=>{
    const title = req.query.title;
    const article = articles.find(a => a.title === title);
    res.render("edit.ejs",{title, article});
});

app.post("/edit", (req, res)=>{
    const editContent = req.body.content;
    const title = req.body.title;

    const article = articles.find(a => a.title === title);
    article.content = editContent;

    res.redirect("/");
});

//handles new articles
app.get("/new", (req, res)=>{
    res.render("newentry.ejs");
});
app.post("/new", (req, res)=>{
    const newTitle = req.body.title;
    const newContent = req.body.content;
    articles.push({title: newTitle, content: newContent});
    res.redirect("/");
});

app.listen(port, (req, res)=>{
    console.log(`Server is currently running on port ${port}`);
})