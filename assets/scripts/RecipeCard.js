// RecipeCard.js

class RecipeCard extends HTMLElement 
{
  // Called once when document.createElement('recipe-card') is called, or
  // the element is written into the DOM directly as <recipe-card>
  constructor() 
  {
    super(); // Inheret everything from HTMLElement

    // EXPOSE - START (All expose numbers start with A)
    // A1. TODO - Attach the shadow DOM to this Web Component (leave the mode open)
    const shadow = this.attachShadow({ mode: "open" });

    // A2. TODO - Create an <article> element - This will hold our markup once our data is set
    const articleElmt = document.createElement("article");

    // A3. TODO - Create a style element - This will hold all of the styles for the Web Component
    let styleElmt = document.createElement("style");
    
    // A4. TODO - Insert all of the styles from cardTemplate.html into the <style> element you just made
    styleElmt.textContent = `
      * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }

      a {
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      article {
        align-items: center;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        row-gap: 5px;
        padding: 0 16px 16px 16px;
        width: 178px;
      }

      div.rating {
        align-items: center;
        column-gap: 5px;
        display: flex;
      }

      div.rating>img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }

      article>img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 118px;
        object-fit: cover;
        margin-left: -16px;
        width: calc(100% + 32px);
      }

      p.ingredients {
        height: 32px;
        line-height: 16px;
        padding-top: 4px;
        overflow: hidden;
      }

      p.organization {
        color: black !important;
      }

      p.title {
        display: -webkit-box;
        font-size: 16px;
        height: 36px;
        line-height: 18px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      p:not(.title),
      span,
      time {
        color: #70757A;
        font-size: 12px;
      }
    `;
    
    // A5. TODO - Append the <style> and <article> elements to the Shadow DOM
    shadow.appendChild(styleElmt);
    shadow.appendChild(articleElmt);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For Example:
   * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
   * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <recipe-card>, must be of the
   *                        following format:
   *                        {
   *                          "imgSrc": "string",
   *                          "imgAlt": "string",
   *                          "titleLnk": "string",
   *                          "titleTxt": "string",
   *                          "organization": "string",
   *                          "rating": number,
   *                          "numRatings": number,
   *                          "lengthTime": "string",
   *                          "ingredients": "string"
   *                        }
   */
  set data(data) {
    // If nothing was passed in, return
   
    if (!data) return;

    // A6. TODO - Select the <article> we added to the Shadow DOM in the 
    let articleElmt = null;
    for (let i=0; i < this.shadowRoot.children.length; i++)
    {
      //console.log(this.shadowRoot.children.item(i).tagName);
      if (this.shadowRoot.children.item(i).tagName == "ARTICLE")
      {
         articleElmt = this.shadowRoot.children.item(i);
         break;
      }
    }
    if (!articleElmt) return;

    // A7. TODO - Set the contents of the <article> with the <article> template given in
    //           cardTemplate.html and the data passed in (You should only have one <article>,
    //           do not nest an <article> inside another <article>). You should use Template
    //           literals (tempalte strings) and element.innerHTML for this.

    //console.log(data.imgSrc);
    let elmnt_img = document.createElement("img");
    elmnt_img.src=data.imgSrc;
    elmnt_img.alt=data.imgAlt;

    let elmnt_p1 = document.createElement("p");
    elmnt_p1.setAttribute("class", "title")
    let elmnt_a = document.createElement("a");
    elmnt_a.innerText= data.titleTxt;
    elmnt_a.href= data.titleLnk;
    elmnt_p1.appendChild(elmnt_a);

    let elmnt_p2 = document.createElement("p");
    elmnt_p2.setAttribute("class", "organization");
    elmnt_p2.innerText = data.organization;

    let elmnt_div = document.createElement("div");
    elmnt_div.setAttribute("class", "rating");
    let elmnt_div_span_1 = document.createElement("span");
    elmnt_div_span_1.innerText=data.rating;
    elmnt_div.appendChild(elmnt_div_span_1);
    let elmnt_div_img = document.createElement("img");
    elmnt_div_img.src="./assets/images/icons/5-star.svg";
    elmnt_div_img.alt="5 stars";
    elmnt_div.appendChild(elmnt_div_img);
    let elmnt_div_span_2 = document.createElement("span");
    elmnt_div_span_2.innerText=data.numRatings;
    elmnt_div.appendChild(elmnt_div_span_2);
  
    let elmnt_time = document.createElement("time");
    elmnt_time.innerText=data.lengthTime;
  
    let elmnt_p3 = document.createElement("p");
    elmnt_p3.setAttribute("class", "ingredients");
    elmnt_p3.innerText = data.ingredients;

    articleElmt.append(elmnt_img);
    articleElmt.append(elmnt_p1);
    articleElmt.append(elmnt_p2);
    articleElmt.append(elmnt_div);
    articleElmt.append(elmnt_time);
    articleElmt.append(elmnt_p3);

    console.log(articleElmt);
  }
}

// A8. TODO - Define the Class as a customElement so that you can create
//           'recipe-card' elements
customElements.define("recipe-card", RecipeCard);