let expenses=[];
let chart;

function getEmoji(category){

category=category.toLowerCase();

if(category.includes("food")) return "🍔";
if(category.includes("travel")) return "✈️";
if(category.includes("shopping")) return "🛍️";
if(category.includes("movie")) return "🎬";
if(category.includes("health")) return "💊";

return "💰";
}

function addExpense(){

const expense={
amount:parseFloat(document.getElementById("amount").value),
category:document.getElementById("category").value,
description:document.getElementById("description").value,
date:document.getElementById("date").value
};

fetch("/expenses",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(expense)
})
.then(()=>loadExpenses());

}

function deleteExpense(id){

fetch("/expenses/"+id,{
method:"DELETE"
})
.then(()=>loadExpenses());

}

function loadExpenses(){

fetch("/expenses")
.then(res=>res.json())
.then(data=>{

expenses=data;

renderList(data);

calculateStats(data);

createChart(data);

});

}

function renderList(data){

const list=document.getElementById("list");

list.innerHTML="";

data.forEach(e=>{

const emoji=getEmoji(e.category);

const div=document.createElement("div");
div.className="item";

div.innerHTML=`
<span>${emoji} ₹${e.amount} - ${e.category}</span>
<button class="delete" onclick="deleteExpense(${e.id})">X</button>
`;

list.appendChild(div);

});

}

function calculateStats(data){

let total=0;
let weekly=0;
let monthly=0;

const now=new Date();

data.forEach(e=>{

total+=e.amount;

const d=new Date(e.date);

const diff=(now-d)/(1000*60*60*24);

if(diff<=7) weekly+=e.amount;

if(d.getMonth()==now.getMonth()) monthly+=e.amount;

});

document.getElementById("total").innerText=total;
document.getElementById("weekly").innerText=weekly;
document.getElementById("monthly").innerText=monthly;

}

function createChart(data){

const categoryTotals={};

data.forEach(e=>{

if(!categoryTotals[e.category])
categoryTotals[e.category]=0;

categoryTotals[e.category]+=e.amount;

});

const labels=Object.keys(categoryTotals);
const values=Object.values(categoryTotals);

const ctx=document.getElementById("chart");

if(chart) chart.destroy();

chart=new Chart(ctx,{
type:'pie',
data:{
labels:labels,
datasets:[{
data:values
}]
}
});

}

function searchExpense(){

const keyword=document.getElementById("search").value.toLowerCase();

const filtered=expenses.filter(e=>

e.category.toLowerCase().includes(keyword) ||
e.description.toLowerCase().includes(keyword)

);

renderList(filtered);

}

loadExpenses();