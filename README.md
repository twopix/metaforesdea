# metaforesdea [![Netlify Status](https://api.netlify.com/api/v1/badges/480fde0b-7a63-425a-b8d0-959e81d4c339/deploy-status)](https://app.netlify.com/sites/metaforesdea/deploys)

<img src="./assets/images/metaforesdea-horizontal.svg" alt="metaforesdea" width="200" />

The SPA site uses 11ty, netlify for deploying and netlify cms for editing and publishing


```
npm install i
```

Commands
```
// to execute
npm start  

// to deploy
npm build 

// for debuging
npm debug
```

## Permalinks

For greek we use / in permalinks as it the default language


Eleventy Navigation

https://www.11ty.dev/docs/plugins/navigation/


You can use this for iterate files
```
getFilteredByGlob
```


We use frontmatter vars for meta-information in pages 

Use 
`metaTitle`, `metaDescription` and `metaImage` to describe extra information 
Or the filtered by locales
`site[locale].metaTitle` <br>
`site[locale].metaDescription` <br>
`site[locale].metaImage ` <br>

Another global data <br>
`{% for slide in settings[locale].sliders %}`


<p>
For filter date local <br>
https://moment.github.io/luxon/demo/global.html 

```
{{article.date  | postDate(site[locale].locales) }}
```

```
{{ article.date | postDateFormat(site[locale].locales, 'MM')}}
// only month
```
</p>

{{ collections.members | length }} length of array

{# {{ member.data | console | safe }} #} -> debug