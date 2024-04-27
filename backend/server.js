import express from "express";
import mysql from 'mysql';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from "url";
//import http from "http";

//options de stockage pour multer
const storage = multer.diskStorage({
    destination: 'frontend/src/assets/usersMedias',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
      },
})

// Middleware de téléchargement avec Multer
const upload = multer({ storage : storage });

// Chemin du module actuel
const __filename = fileURLToPath(import.meta.url);
// Répertoire parent en utilisant path et __filename
const __dirname = dirname(__filename);

//const server = http.createServer(app);
const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET","PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: false,
        masAge: 1000*60*60*24
    }
}))

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database: "mall_db"
})

console.log('connected to the database');

// Fonction pour exécuter des requêtes SQL
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) {
            reject(err);
            } else {
            resolve(results);
            }
        });
    });
};


app.get('/', (req, res)=> {
    if(req.session.username){
        return res.json({valid: true, username: req.session.username});
}else{
    return res.json({valid: false});
}})

//Routes pour les publications
// --récupération des posts--
app.get('/get-posts', async (req, res) => {
    const sql = "SELECT * FROM posts";

    try {
        const results = await query(sql);

        if (results.length === 0) {
            console.log('Aucun post trouvé');
            return res.json({ fetched: false });
        }

        const postsWithComments = await Promise.all(results.map(async (row) => {
            const commentsQuery = "SELECT * FROM comments WHERE postId = ?";
            const comment = await query(commentsQuery, [row.id]);

            if (comment.length === 0) {
                console.log("Aucun commentaire sur ce post");
            }
            const comments = {
                comments: comment.map((com) => ({
                    id: com.id,
                    postId: com.postId,
                    author: com.author,
                    comment: com.comment,
                    likes: com.likes,
                    date: com.date,
                })),
            }
            const postData = {
                postId: row.id,
                author: row.author,
                fileUrl: path.join('\\src', path.relative(path.join(__dirname, 'src', 'mall'), row.fileUrl)).replace(/mall\\/g, ''),
                catalogLink: row.catalogLink,
                content: row.content,
                likes: row.likes,
                tags: row.tags,
                date: row.date,
                comments: comments,
            };
        return postData;
    }));
      return res.json({ posts: postsWithComments }); // Assurez-vous de retourner les données dans le bon format
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données.' });
    }
});

// --récupération d'un post--
app.get('/get-post/:id', async (req, res) => {
    const postId = req.params.id;
    const sql = "SELECT * FROM posts WHERE id = ?";

    try {
        const results = await query(sql, postId);

        if (results.length === 0) {
            console.log('Aucun post trouvé');
            return res.json({ fetched: false });
        }

        const post = results[0];
        const commentsQuery = "SELECT * FROM comments WHERE postId = ?";
        const comment = await query(commentsQuery, [post.id]);
        if (comment.length === 0) {
                console.log("Aucun commentaire sur ce post");
            }
            const postData = {
                postId: post.id,
                author: post.author,
                fileUrl: path.join('\\src', path.relative(path.join(__dirname, 'src', 'mall'), post.fileUrl)).replace(/mall\\/g, ''),
                catalogLink: post.catalogLink,
                content: post.content,
                likes: post.likes,
                tags: post.tags,
                date: post.date,
                comments: comment.map((com) => ({
                    id: com.id,
                    postId: com.postId,
                    userId: com.userId,
                    comAuthor: com.comAuthor,
                    comment: com.comment,
                    likes: com.likes,
                    date: com.date,})),
            };
            return res.json({post: postData});
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données.' });
    }
});

// --récupération des posts associés à un utlisateur--
app.get('/get-posts/:id', async (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT * FROM posts WHERE userId = ?";

    try {
        const results = query(sql, userId);

        if (results.length === 0) {
            console.log('Aucun post trouvé');
            return res.json({ fetched: false });
        }

        const postsWithComments = await Promise.all(results.map(async (row) => {
            const commentsQuery = "SELECT * FROM comments WHERE postId = ?";
            const comment = query(commentsQuery, [row.id]);

            if (comment.length === 0) {
                console.log("Aucun commentaire sur ce post");
            }
            const comments = {
                comments: comment.map((com) => ({
                    id: com.id,
                    postId: com.postId,
                    userId: com.userId,
                    comAuthor: com.comAuthor,
                    comment: com.comment,
                    likes: com.likes,
                    date: com.date,
                })),
            }
            const postData = {
                postId: row.id,
                author: row.author,
                fileUrl: path.join('\\src', path.relative(path.join(__dirname, 'src', 'mall'), row.fileUrl)).replace(/mall\\/g, ''),
                catalogLink: row.catalogLink,
                content: row.content,
                likes: row.likes,
                tags: row.tags,
                date: row.date,
                comments: comments,
            };
        return postData;
    }));
      return res.json({ posts: postsWithComments }); // Assurez-vous de retourner les données dans le bon format
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données.' });
    }
});

// --creation des posts--
app.post('/create-post', upload.any('file'), async (req, res)=> {
    const uploadeFiles = req.files
    //parcourir les fichiers
    uploadeFiles.forEach((file) => {
        const fileName = `${req.session.id}_${Date.now()}_${file.originalname}`
        const fileUrl = file.path;

        try {
        // Déplacez le fichier vers le répertoire de destination
            const destinationFolderPath = path.resolve(__dirname, '..','frontend', 'src', 'assets', 'usersMedias')
            const destinationFilePath = path.join(destinationFolderPath, fileName)
            fs.copyFileSync(fileUrl, destinationFilePath)
    
            const createPostQuery = "INSERT INTO posts (`userId`, `author`, `fileUrl`, `catalogLink`, `content`, `tags`, `date`) VALUES (?,?,?,?,?,?,?)"
            const values = [req.body.userId, req.body.author, destinationFilePath, req.body.catalogLink, req.body.content, req.body.tags, new Date.toLocaleString()]
        
            query(createPostQuery, values, (err, data) => {
                if (err){
                    console.log(err);
                    return res.json({Message:"Erreur lors de l'enregistrement du post"})
                }
                return res.json(data)
            })
        }
        catch (error) {
            console.error('Erreur lors du déplacement du fichier :', error);
            res.status(500).json({ error: 'Une erreur est survenue lors du téléchargement du fichier.' });
        }
    }) 
})

// --mise à jour des posts--
app.put('/posts/:id', (req, res) => {
    const postId =req.params.id
    const newLikeValue = req.body.likes

    const sql = "UPDATE posts SET likes = ? WHERE id = ?"
    query(sql, [newLikeValue, postId], (err, data) => {
        if (err){
            console.log(err)
            return res.json({Message:"Erreur lors de la mise à jour du post : ajout du like"})
        }
        else{
        return res.json({message: "Like ajouté avec succès", dtats: data})
        }
    })
})

//--Ajout des commentaires--
app.post('/comments', (req, res) => {
    const createCommentQuery = "INSERT INTO comments (`postId`, `userId`,`author`, `comment`,`likes`, `date`) VALUES (?,?,?,?,?,?)"
    const values = [req.body.postId, req.session.userId, req.body.username, req.body.comment, 0, new Date.toLocaleString()]
    query(createCommentQuery, values, (err, data) => {
        if (err){
        console.log(err)
        return res.json({Message:"Erreur lors de l'ajout du commentaire"})
    }
    console.log(data)
    return res.json(data)
    })
})

//Routes pour les posts sauvegardés
/*--suppression d'un post sauvegardé--*/
app.delete('/savedPosts', (req, res) => {
    try {
        const query = "DELETE FROM savedposts WHERE postId = ? AND userId = ?" 
        const values = [
            req.body.PostId,
            req.body.userId,
        ]
    query(query, values, (err, data) => {
        if (err){
            console.log(err);
            return res.json({Message: 'Error while removing the post from the server'})
        }

        res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.status(200).send('SavedPosts mis à jour avec succès')
        console.log(data);
        return res.json(data)
        });
    }catch(error){
    console.log(error);
    return res.status(500).json({Message: 'Erreur lors de la suppression du post des sauvagardes'})
    }
})

app.post('/savedPosts', (req, res) => {
    try {
        const sql = "INSERT INTO savedposts (`postId`, `userId`) VALUES (?,?)" 
        const values = [
            req.body.PostId,
            req.body.userId,
        ]
    query(sql, values, (err, data) => {
        if (err){
            console.log(err);
            return res.json({Message: 'Error while adding the saved post in the server'})
        }

        res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.status(200).send('SavedPosts mis à jour avec succès');
        return res.json(data)
        });
    }catch(error){
    console.error(error);
    return res.status(500).json({Message: 'Erreur lors de l\'enregistrement du post dans les sauvegardes'})
    }
})

app.get('/get-saved-posts/:id', async (req, res) => {
    const sql = "SELECT * FROM savedposts WHERE userId = ?";
    const userId = req.params.id; // Utilisez req.params.id au lieu de req.params.userId

    try {
        const results = await query(sql, userId); // Attendre la résolution de la promesse

        if (results.length === 0) {
            console.log('Aucun post sauvegardé trouvé');
            return res.json({ fetched: false });
        }

        const savedPostsData = await Promise.all(results.map(async (post) => {
            const savedPostsQuery = "SELECT * FROM posts WHERE id = ?"
            const value = post.postid;

            const newResults = await query(savedPostsQuery, value); // Attendre la résolution de la promesse

            if (newResults.length === 0) {
                console.log('no posts after fetching');
                return { fetched: false };
            }

            const savedPosts = {
                id: newResults[0].id,
                userId: post.UserId,
                author: newResults[0].author,
                content: newResults[0].content,
                fileUrl: newResults[0].fileUrl,
                likes: newResults[0].likes,
                tags: newResults[0].tags,
                date: newResults[0].date,
            };

            const saves = {
                saved: savedPosts,
            };
            return saves;
        }));
        return res.json({ savedPosts: savedPostsData });

    } catch (error) {
        console.error('Erreur lors de la récupération des post sauvegardés:', error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des posts sauvegardés' });
    }
});

//route pour les notifications
/** creation d'une notification */
app.post('/create-notif', (req, res) => {
    const notifId = req.body.id;
    const getPostQuery =  'SELECT (`id`, `shopId`, `shopName`) FROM posts WHERE notification = (?)'
    
    try{
        const results = query(getPostQuery, notifId)
        if (results.length === 0) {
            console.log('Aucun id de post trouvé pour la notif');
            return res.json({ fetched: false });
        }

        const sql = "INSERT INTO notifications (`shopId`, `ShopName`, `content`, `link`, `date`, `status`) VALUES (?,?,?,?,?,?)"
        const values = [
            results.shopId,
            results.shopName,
            'New update from a shop that you follow',
            `/view-post/${results.id}`,
            new Date.toLocaleString(),
            'unread'
        ]

        query(sql, values, (err, data) => {
            if (err){
                console.log(err);
                return res.json({Message: 'Error while adding the notification in the server'})
            }
    
            res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
            res.status(200).send('Notification ajoutée avec succès');
            console.log(data);
            return res.json(data)
    })
    }catch(error){
        console.error('Erreur lors de l\'ajout de la notification:', error)
    }
})

/*-- récupération des notifications pour un utilisateur --*/
app.get('/get-notif/:id', async (req, res) => {
    const userId = req.params.id;
    const subscriptionQuery = "SELECT `shopId` FROM subscription WHERE userId = ?";
    try {
        const results = await query(subscriptionQuery, [userId]);

        if (results.length === 0) {
        console.log('Error while fetching subscriptions');
        return res.json({ fetched: false });
    }

    const sql = "SELECT * FROM subscription WHERE shopId = ?";
    const notifications = [];

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const shop = result.shopId;
        const data = await query(sql, [shop]);

        if (data.length === 0) {
            console.log('Error while getting user notification in the server');
            return res.json({ fetched: false });
        }

        const notif = {
            id: data[0].id,
            shopId: data[0].shopId,
            shopName: data[0].shopName,
            content: data[0].content,
            link: data[0].link,
            date: data[0].date,
            status: data[0].status,
        };

        notifications.push(notif);
    }

    console.log(results);
    return res.json(notifications);
    } catch (error) {
        console.error('Erreur lors de la récupération de toutes les notifications de l\'utilisateur');
        return res.json([]);
    }
});

//routes pour les boutiques
/*récupération de la boutique d'un utilisateur*/
app.get('/get-shops/:id', async (req, res) => {
    const userId = req.params.id
    const sql = "SELECT * FROM shops WHERE userId = (?)"
    try {
        const results = await query(sql, [userId])
        if(results.length === 0){
            console.log("No shop found for this user")
            return res.json({fetched: false})
        }
        const shop = {
            id: results[0].id,
            userId: results[0].userId,
            shopName: results[0].shopName,
            holdername: results[0].holderName,
            followers: results[0].followers,
            openTime: results[0].openTime,
            closeTime: results[0].closeTime,
            profileImageUrl: path.join('frontend', 'src', 'assets', 'usersMedias', results[0].profileImageUrl),
        }
        return res.json({userShop: shop})
    } catch (error) {
        console.error('error while fetching user post :', error)
    }
})

/*récupération de toutes les boutiques*/
app.get('/get-shops', async (req, res) => {
    const sql = "SELECT * FROM shops"
    try {
        const results = await query(sql)
        if(results.length === 0){
            console.log("o shop found for this user")
            return res.json({fetched: false})
        }
        const shop = {
            id: results.id,
            userid: results.userId,
            shopName: results.shopName,
            holdername: results.holderName,
            followers: results.followers,
            following: results.following,
            profileImageUrl: results.profileImageUrl,
        }
        console.log('user shop :', shop)
        return res.json({userShop: shop})
    } catch (error) {
        console.error('error while fetching user post :', error)
    }
})
/*création d'une boutique*/
app.post('/create-shop', async (req, res) => {
    const values = [ 
        req.body.userId,
        req.body.shopName, 
        req.body.shopOwner,  
        req.body.shopEmail, 
        0,
        0,
        req.body.shopPhone,
        req.body.shopCountry,
        req.body.shopCity, 
        req.body.shopAdress,  
        new Date.toLocaleString()
    ]

    const sql = 'INSERT INTO shops (`shopName`, `holderName`, `email`, `followers`, `following`, `shopPhone`, `country`, `city`, `adress`, `creationDate`) VALUES (?,?,?,?,?,?,?,?,?,?)'

    try{
    const result = await db.query(sql, values)
    const response = {
        insertId: result.insertId
    }
    return res.json (response)
    } catch(err){
    console.error(err)
    return res.json({ Message: "Erreur lors de la création de la boutique"})
    }
})

//route pour la création d'une boutique par un utilisateur
app.post('/create-shop/:id', async (req, res) => {
    const userId = req.params.id
    const values = [ 
        userId,
        req.body.shopName, 
        req.body.shopOwner,  
        req.body.shopEmail, 
        0,
        0,
        req.body.shopPhone,
        req.body.shopCountry,
        req.body.shopCity, 
        req.body.shopAdress,  
        new Date.toLocaleString()
    ]

    const sql = 'INSERT INTO shops (`userId`,`shopName`, `holderName`, `email`, `followers`, `following`, `shopPhone`, `country`, `city`, `adress`, `creationDate`) VALUES (?,?,?,?,?,?,?,?,?,?,?)'

    try{
    const result = await db.query(sql, values)
    const response = {
        insertId: result.insertId
        }
        return res.json (response)
    } catch(err){
        console.error(err)
        return res.json({ Message: "Erreur lors de la création de la boutique"})
    }
})

//suppresssion d'une boutique
app.delete('/delete-shop/:id', (req, res)=>{
    const shopId = req.params.id
    const sql = "DELETE * FROM shops WHERE id = (?)"
    query(sql, shopId, (err, data) => {
        if (err){
            console.log(err)
            return res.json({Message:"Erreur lors de la suppression dde la boutique"})
        }
        else{
            console.log(data)
            return res.json({message: "Boutique supprimée avec succès"})
        }
    })
})

//routes pour les produits
// Route pour l'ajout de produits
app.post('/add-product', upload.array('image'), async (req, res) => {

    try {
        const uploadedFiles = req.files;

        // Parcourir les fichiers téléchargés
        uploadedFiles.forEach((file) => {
            // eslint-disable-next-line no-unused-vars
            const fileType = file.mimetype;
            const fileName = `${req.session.id}_${Date.now()}_${file.originalname}`;
            // eslint-disable-next-line no-unused-vars
            const filePath = file.path;

            // Déplacez le fichier vers le répertoire de destination
            const destinationFolderPath = path.resolve(__dirname, '..','frontend', 'src', 'assets', 'usersMedias');
            const destinationFilePath = path.join(destinationFolderPath, fileName);
            fs.copyFileSync(filePath, destinationFilePath);

            const createProductQuery = "INSERT INTO products (`productName`,`shopId`, `imageUrl`, `price`, category, `description`) VALUES (?,?,?,?,?,?) WHERE id= ?";
            const values = [req.body.name, req.body.shopId, fileName, req.body.price, req.body.category, req.body.description,req.body.updateId,]; // Utilisez seulement le nom du fichier ici
                
            db.query(createProductQuery, values, (err, data) => {
            if (err) {
                console.log(err);
                return res.json({ Message: "Erreur lors de l'enregistrement du produit" });
            }
            console.log(data);
            return res.json(data);
        });
    });
    } catch (error) {
        console.error('Erreur lors du déplacement du fichier :', error);
        res.status(500).json({ error: 'Une erreur est survenue lors du téléchargement du fichier.' });
    }
});

  //route pour la récupération des produits
app.get('/get-products', async (req, res) => {
    const sql = "SELECT * FROM products";

    try {
        const results = await query(sql);

        if (results.length === 0) {
            console.log('Aucun produit trouvé');
            return res.json({ fetched: false });
        }

        const products = results.map((row) => ({
            productId: row.id,
            productName: row.name,
            price: row.price,
            category: row.category,
            description: row.description,
            image: path.join('\\src', path.relative(path.join(__dirname, 'src', 'mall'), row.image)).replace(/mall\\/g, ''),
            date: row.date,
        }));

        console.log(products);
        return res.json({ products });
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des produits.' });
    }
});

  //route pour la récupération des produits d'une' boutique
app.get('/get-products/:id', async (req, res) => {
    const shopId = req.params.id;
    const sql = "SELECT * FROM products WHERE shopId = ?";

    try {
        const results = await query(sql, [shopId]);

        if (results.length === 0) {
            console.log('Aucun produit trouvé');
            return res.json({ fetched: false });
        }

        const products = results.map((row) => ({
            productId: row.id,
            shopId: row.shopId,
            productName: row.productName,
            price: row.price,
            stock: row.stock,
            nbLikes: row.likes,
            nbSales: row.sales,
            status: row.status,
            category: row.category,
            description: row.description,
            image: path.join('frontend', 'src', 'assets', 'usersMedias', row.imageUrl),
            date: row.date,
        }));

        console.log(products);
        return res.json( products );
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des produits.' });
    }
});

//route pour la mise à jour des produits
app.put('/update-product/:id', upload.single('image'), (req, res) => {

    try{
        const productId =req.params.id
        const newNameValue = req.body.name
        const newCategoryValue = req.body.category
        const newPriceValue = req.body.price
        const newDescriptionValue = req.body.description
        const newImageFileName = req.file.filename
        const loadedFile = req.file

        console.log('received datas: ', productId, newNameValue, newPriceValue, newDescriptionValue, newImageFileName)
        // eslint-disable-next-line no-unused-vars
        const fileType = loadedFile.mimetype;
            const fileName = `${req.session.id}_${Date.now()}_${loadedFile.originalname}`;
            // eslint-disable-next-line no-unused-vars
            const filePath = loadedFile.path;

            // Déplacez le fichier vers le répertoire de destination
            const destinationFolderPath = path.resolve(__dirname, '..','frontend', 'src', 'assets', 'usersMedias');
            const destinationFilePath = path.join(destinationFolderPath, fileName);
            fs.copyFileSync(filePath, destinationFilePath);

        const query = "UPDATE products SET productName = ?, imageUrl = ?, price = ?, category = ?, description = ? WHERE id = ?"
        db.query(query, [newNameValue, fileName, newPriceValue, newCategoryValue, newDescriptionValue, productId], (err, data) => {
            if (err){
                console.log(err)
                return res.json({Message:"Erreur lors de la mise à jour du produit"})

            }
                console.log(data)
                return res.json({message: "Produit mis à jour avec succès"})
            })
    }catch(err){
        console.error('Error while updating product:', err);
    }
})

  //route pour la suppression des produits
app.delete('/remove-product/:id',async (req, res) => {
    try{
        const productId = req.params.id
        const query = "DELETE FROM products WHERE id = ?"
        db.query(query, productId, (err, data) => {
            if (err){
                console.log(err)
                return res.json({Message:"Erreur lors de la suppression du produit"})
            }
            console.log(data);
            return res.json(data)
        })
    } catch (err){
        console.error('Error while deleting product:', err);
        return res.status(500).json({Message: 'Erreur lors de la suppression du post des sauvagardes'})
    }
})
//routes pour les ventes
//route pour les ventes journalières
app.get('/daily-sales', async (req, res) => {
    const sql = "SELECT * FROM dailysales";

    try {
        const results = await query(sql);
        
        if (results.length === 0) {
            console.log('Aucune vente journalière trouvée');
            return res.json({ fetched: false });
        }

        const dailySales = results.map((row) => ({
            saleId: row.id,
            shopId: row.shopId,
            day1: row.day1,
            day2: row.day2,
            day3: row.day3,
            day4: row.day4,
            day5: row.day5,
            day6: row.day6,
            day7: row.day7,
        }));

        console.log(dailySales);
        return res.json({ dailySales });
    } catch (error) {
        console.error('Erreur lors de la récupération des ventes journalières :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des ventes journalières.' });
    }
})

//route pour la mise à jour des ventes journalières
app.put('/update-daily-sales/:id', (req, res) => {
    const saleId =req.params.id
    const newDay1 = req.body.day1
    const newDay2 = req.body.day2
    const newDay3 = req.body.day3
    const newDay4 = req.body.day4
    const newDay5 = req.body.day5
    const newDay6 = req.body.day6
    const newDay7 = req.body.day7

    console.log('received datas: ', saleId, newDay1, newDay2, newDay3, newDay4, newDay5, newDay6, newDay7)

    const query = "UPDATE dailysales SET day1 = ?, day2 = ?, day3 = ?, day4 = ?, day5 = ?, day6 = ?, day7 = ? WHERE id = ?"
    db.query(query, [newDay1, newDay2, newDay3, newDay4, newDay5, newDay6, newDay7, saleId], (err, data) => {
        if (err){
            console.log(err)
            return res.json({Message:"Erreur lors de la mise à jour des ventes journalières"})
        }
        else{
            console.log(data)
            return res.json({message: "Ventes journalières mises à jour avec succès"})
        }
    })
})

//route pour les ventes hebdomadaires
app.get('/weekly-sales', async (req, res) => {
    const sql = "SELECT * FROM weeklysales";

    try {
        const results = await query(sql);

        if (results.length === 0) {
            console.log('Aucune vente hebdomadaire trouvée');
            return res.json({ fetched: false });
        }

        const weeklySales = results.map((row) => ({
            saleId: row.id,
            shopId: row.shopId,
            week1: row.week1,
            week2: row.week2,
            week3: row.week3,
            week4: row.week4,
        }));

        console.log(weeklySales);
        return res.json({ weeklySales });
    } catch (error) {
        console.error('Erreur lors de la récupération des ventes hebdomadaires :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des ventes hebdomadaires.' });
    }
})

//route pour la mise à jour des ventes hebdomadaires
app.put('/update-weekly-sales/:id', (req, res) => {
    const saleId =req.params.id
    const newWeek1 = req.body.week1
    const newWeek2 = req.body.week2
    const newWeek3 = req.body.week3
    const newWeek4 = req.body.week4

    console.log('received datas: ', saleId, newWeek1, newWeek2, newWeek3, newWeek4)

    const query = "UPDATE weeklysales SET week1 = ?, week2 = ?, week3 = ?, week4 = ? WHERE id = ?"
    db.query(query, [newWeek1, newWeek2, newWeek3, newWeek4, saleId], (err, data) => {
        if (err){
            console.log(err)
            return res.json({Message:"Erreur lors de la mise à jour des ventes hebdomadaires"})
        }
        else{
            console.log(data)
            return res.json({message: "Ventes hebdomadaires mises à jour avec succès"})
        }
    })
})

//route pour les ventes mensuelles
app.get('/monthly-sales', async (req, res) => {
    const sql = "SELECT * FROM monthlysales";

    try {
        const results = await query(sql);

        if (results.length === 0) {
            console.log('Aucune vente mensuelle trouvée');
            return res.json({ fetched: false });
        }

        const monthlySales = results.map((row) => ({
            saleId: row.id,
            shopId: row.shopId,
            month1: row.month1,
            month2: row.month2,
            month3: row.month3,
            month4: row.month4,
            month5: row.month5,
            month6: row.month6,
            month7: row.month7,
            month8: row.month8,
            month9: row.month9,
            month10: row.month10,
            month11: row.month11,
            month12: row.month12,
        }));

        console.log(monthlySales);
        return res.json({ monthlySales });
    } catch (error) {
        console.error('Erreur lors de la récupération des ventes mensuelles :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des ventes mensuelles.' });
    }
})

//route pour la mise à jour des ventes mensuelles
app.put('/update-monthly-sales/:id', (req, res) => {
    const saleId =req.params.id
    const newMonth1 = req.body.month1
    const newMonth2 = req.body.month2
    const newMonth3 = req.body.month3
    const newMonth4 = req.body.month4
    const newMonth5 = req.body.month5
    const newMonth6 = req.body.month6
    const newMonth7 = req.body.month7
    const newMonth8 = req.body.month8
    const newMonth9 = req.body.month9
    const newMonth10 = req.body.month10
    const newMonth11 = req.body.month11
    const newMonth12 = req.body.month12

    console.log('received datas: ', saleId, newMonth1, newMonth2, newMonth3, newMonth4, newMonth5, newMonth6, newMonth7, newMonth8, newMonth9, newMonth10, newMonth11, newMonth12)

    const query = "UPDATE monthlysales SET month1 = ?, month2 = ?, month3 = ?, month4 = ?, month5 = ?, month6 = ?, month7 = ?, month8 = ?, month9 = ?, month10 = ?, month11 = ?, month12 = ? WHERE id = ?"
    db.query(query, [newMonth1, newMonth2, newMonth3, newMonth4, newMonth5, newMonth6, newMonth7, newMonth8, newMonth9, newMonth10, newMonth11, newMonth12, saleId], (err, data) => {
        if (err){
            console.log(err)
            return res.json({Message:"Erreur lors de la mise à jour des ventes mensuelles"})

        }
        else{
            console.log(data)
            return res.json({message: "Ventes mensuelles mises à jour avec succès"})
        }
    })
})

//route pour les ventes annuelles
app.get('/annual-sales', async (req, res) => {
    const sql = "SELECT * FROM annualsales";

    try {
        const results = await query(sql);

        if (results.length === 0) {
            console.log('Aucune vente annuelle trouvée');
            return res.json({ fetched: false });
        }

        const annualSales = results.map((row) => ({
            saleId: row.id,
            shopId: row.shopId,
            year1: row.year1,
            year2: row.year2,
            year3: row.year3,
            year4: row.year4,
            year5: row.year5,
            year6: row.year6,
            year7: row.year7,
            year8: row.year8,
            year9: row.year9,
            year10: row.year10,
        }));

        console.log(annualSales);
        return res.json({ annualSales });
    } catch (error) {
        console.error('Erreur lors de la récupération des ventes annuelles :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des ventes annuelles.' });
    }
})

//route pour la mise à jour des ventes annuelles
app.put('/update-annual-sales/:id', (req, res) => {
    const saleId =req.params.id
    const newYear1 = req.body.year1
    const newYear2 = req.body.year2
    const newYear3 = req.body.year3
    const newYear4 = req.body.year4
    const newYear5 = req.body.year5
    const newYear6 = req.body.year6
    const newYear7 = req.body.year7
    const newYear8 = req.body.year8
    const newYear9 = req.body.year9
    const newYear10 = req.body.year10

    console.log('received datas: ', saleId, newYear1, newYear2, newYear3, newYear4, newYear5, newYear6, newYear7, newYear8, newYear9, newYear10)

    const query = "UPDATE annualsales SET year1 = ?, year2 = ?, year3 = ?, year4 = ?, year5 = ?, year6 = ?, year7 = ?, year8 = ?, year9 = ?, year10 = ? WHERE id = ?"
    db.query(query, [newYear1, newYear2, newYear3, newYear4, newYear5, newYear6, newYear7, newYear8, newYear9, newYear10, saleId], (err, data) => {
        if (err){
            console.log(err)
            return res.json({Message:"Erreur lors de la mise à jour des ventes annuelles"})

        }
        else{
            console.log(data)
            return res.json({message: "Ventes annuelles mises à jour avec succès"})
        }
    })
})

//routes pour les commandes
//route pour la récupération des commandes
app.get('/get-commands', async (req, res) => {
    const sql = "SELECT * FROM commands";

    try {
        const results = await query(sql);

        if (results.length === 0) {
            console.log('Aucune commande trouvée');
            return res.json({ fetched: false });
        }

        const commands = results.map((row) => ({
            commandId: row.id,
            customerId: row.customerId,
            shopId: row.shopId,
            productId: row.productId,
            quantity: row.quantity,
            netToPay: row.netToPay,
            deliveryMode: row.deliveryMode,
            deliveryAddress: row.deliveryAddress,
            commandDate: row.commandDate,
            achievement: row.achievement,
        }));

        console.log(commands);
        return res.json({ commands });
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
        return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des commandes.' });
    }
});

//route pour l'ajout des commandes
app.post('/add-command', (req, res) => {
    const createCommandQuery = "INSERT INTO commands (`customerId`, `shopId`, `productId`, `quantity`, `netToPay`, `deliveryMode`, `deliveryAddress`, `commandDate`, `achievement`) VALUES (?,?,?,?,?,?,?,?,?)"
    const values = [req.body.customerId, req.body.shopId, req.body.productId, req.body.quantity, req.body.netToPay, req.body.deliveryMode, req.body.deliveryAddress, new Date.toLocaleString(), req.body.achievement]
    db.query(createCommandQuery, values, (err, data) => {
        if (err){
            console.log(err)
            return res.json({Message:"Erreur lors de l'ajout de la commande"})
        }
        console.log(data)
        return res.json(data)
    })
})

//route pour la mise à jour des commandes
app.put('/update-command/:id', (req, res) => {
    const commandId =req.params.id
    const newAchievementValue = req.body.achievement

    console.log('received datas: ', commandId, newAchievementValue)

    const query = "UPDATE commands SET achievement = ? WHERE id = ?"
    db.query(query, [newAchievementValue, commandId], (err, data) => {
        if (err){
            console.log(err)
            return res.json({Message:"Erreur lors de la mise à jour de la commande"})

        }
        else{
            console.log(data)
            return res.json({message: "Commande mise à jour avec succès"})
        }
    })
})

app.listen(8081, ()=>{
    console.log("Connected to the server on localhost:8081");
})
