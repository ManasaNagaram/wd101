let userForm=document.getElementById('user-form');
let today = new Date().getTime();
let datemax = new Date(today - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
let datemin = new Date(today - 55 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

document.getElementById('dob').max=datemax;
document.getElementById('dob').min=datemin;
function retriveEntries(){
    let userEntries = localStorage.getItem('userEntries');
    if(localStorage.getItem('userEntries')){
        userEntries=JSON.parse(localStorage.getItem('userEntries'));
    }
    else{
        userEntries=[];
    }
    return userEntries
}
let userEntries=retriveEntries();
function displayEntries(){
    const entries=userEntries.map((entry)=>{
        const nameCell=`<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell=`<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell=`<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell=`<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell=`<td class='border px-4 py-2'>${entry.acceptTerms}</td>`;
        const row=`<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join('\n');
    const table=`<table class='table-auto w-full'><tr>
    <caption class="caption-top text-lg ">
        Entries
  </caption>
    <th class='px-4 py-2'>Name</th>
    <th class='px-4 py-2'>Email</th>
    <th class='px-4 py-2'>Password</th>
    <th class='px-4 py-2'>dob</th>
    <th class='px-4 py-2'>accepted terms?</th>
    </tr>${entries}</table>`;
    let details=document.getElementById('user-entries');
    details.innerHTML=table;
}
displayEntries();
userForm.addEventListener('submit',function(event){
    event.preventDefault();
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    let dob=document.getElementById('dob').value;
    let acceptTerms=document.getElementById('acceptTerms').checked;

    const entry={
        name:name,
        email:email,
        password:password,
        dob:dob,
        acceptTerms:acceptTerms
    }
    userEntries.push(entry);
    localStorage.setItem('userEntries',JSON.stringify(userEntries));
    displayEntries();
    localStorage.clear();
});

