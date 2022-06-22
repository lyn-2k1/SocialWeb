<script>
    export let icon 
    export let text = ""
    export let handle
  </script>
 <div class="block" on:click="{handle}">
     <img class="icon" src={icon} alt="Icon">
     {#if text!=""}
        <span class="text">{text}</span>
     {/if}
 </div>
 <style>
   
     .block {
         display: flex;
         height: 50px;
         align-items: center;
         border-radius: 10px;
         padding-left: 10px;
         padding-right: 10px;
         width: 100%;
         max-width: 250px;        
     }
     .icon {
         width: 24px;
         height: 24px;
         margin-right: 8px;
     }
     .text {
       font-weight: 600;
     }
     .block:hover {
         background-color: #e4e6e9;
     }
 
 </style>
         