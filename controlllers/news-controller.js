// //Talking to view layer(html layer)
// // Talking to Html(DOM)

// import { newsService } from "../services/news-service.js";

// //News Card Generate Dynamically(Based on JSON data)

// /*
// Using DOM we have to generate the below html 
//  <div class="col-4">
//             <div class="card" style="width: 18rem">
//               <img src="..." class="card-img-top" alt="..." />
//               <div class="card-body">
//                 <h5 class="card-title">Card title</h5>
//                 <p class="card-text">
//                   Some quick example text to build on the card title and make up
//                   the bulk of the card’s content.
//                 </p>
//                 <a href="#" class="btn btn-primary">Go somewhere</a>
//               </div>
//             </div>
//           </div>
// */
// async function prepareNews() {
//   //Get the data from web api(api-client.js)
//   //Once you get the data then iterate the data and prepare the Html(DOM)

//   const allNews = await newsService.readNews();
//   allNews.forEach((news) => printNews(news));
//   console.log("All news are", allNews);
// }

// function printNews(news) {
//   const newsId = document.querySelector("#news"); //get id
//   const colDiv = document.createElement("div"); //<div></div>
//   colDiv.className = "col-4"; //<div class=col-4>

//   //<div class="card" style="width: 18rem">
//   const cardDiv = document.createElement("div");
//   cardDiv.className = "card";
//   cardDiv.style.width = "18rem";
//   colDiv.appendChild(cardDiv);

//   // <img src="..." class="card-img-top" alt="..." />
//   const img = document.createElement("img");
//   img.src = news.image ? news.image : "./assets/images/default-null.png";

//   img.className = "card-img-top";
//   cardDiv.appendChild(img);

//   const cardBody = document.createElement("div");
//   cardBody.className = "card-body";
//   cardDiv.appendChild(cardBody);

//   //<h5 class="card-title">Card title</h5>
//   const h5 = document.createElement("h5");
//   h5.className = "card-title";
//   h5.innerText = news.title;
//   cardBody.appendChild(h5);

//   const p = document.createElement("p");
//   p.innerText = news.desc;
//   p.className = "card-text";
//   cardBody.appendChild(p);

//   const aTag = document.createElement("a");
//   aTag.href = news.url ? news.url : "#"; // Fallback to "#" if URL is null
//   aTag.className = "btn btn-primary";
//   aTag.innerText = "Read More";
//   aTag.target = "_blank"; // Optional: open in new tab
//   cardBody.appendChild(aTag);

//   newsId.appendChild(colDiv);
// }

// prepareNews();

const newsContainer = document.getElementById("news");

async function loadNews() {
  try {
   const res = await fetch("/news");
    const data = await res.json();

     newsContainer.innerHTML = data.articles
      .map((article) => {
        // fallback image if urlToImage is null/undefined
        const imageUrl = article.urlToImage
          ? article.urlToImage
          : "assets/images/default-null.png"; 

        return `
          <div class="col-md-4 mb-3">
            <div class="card">
              <img src="${imageUrl}" class="card-img-top" alt="news image"/>
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description || ""}</p>
                <a href="${article.url}" target="_blank" class="btn btn-primary">Read more</a>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  } catch (err) {
    newsContainer.innerHTML = `<p class="text-danger">Failed to load news.</p>`;
  }
}

loadNews();

//     newsContainer.innerHTML = data.articles
//       .map(
//         (article) => `
//           <div class="col-md-4 mb-3">
//             <div class="card">
//               <img src="${article.urlToImage}" class="card-img-top" alt="news image"/>
//               <div class="card-body">
//                 <h5 class="card-title">${article.title}</h5>
//                 <p class="card-text">${article.description || ""}</p>
//                 <a href="${article.url}" target="_blank" class="btn btn-primary">Read more</a>
//               </div>
//             </div>
//           </div>
//         `
//       )
//       .join("");
//   } catch (err) {
//     newsContainer.innerHTML = `<p class="text-danger">Failed to load news.</p>`;
//   }
// }

// loadNews();

