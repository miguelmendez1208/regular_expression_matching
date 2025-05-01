function isMatch(s: string, p: string): boolean {
    let states:string[] = [];
    let curr="";
    let try_last ="";
    for (let i=p.length-1;i>=0;i--){
        curr = p[i] + curr;
        if(curr!=="*"){
            if(curr.length>1 && curr===try_last){
                curr="";
                continue;
            }
            states.unshift(curr);
            try_last=curr;
            curr = "";
        }
    }
    return helper(s, states, 0, 0);
}

function helper(s: string, p: string[], i: number, j:number){
    //console.log("at helper s: " + s + " p: " + p);

    for(i; i<s.length;i++){
        if(j>=p.length){
            return false;
        }
        let matching_case = p[j];
        let letter = s[i];

        //star means we split states
        if(matching_case.length>1){
            let base_case = helper(s,p,i,j+1);
            if(base_case){
                return true;
            }
            let matching_letter = matching_case[0];
            if(matching_letter!==letter && matching_letter!=="."){
                return false;
            }
        }
        //consume a j token
        else if (letter===matching_case || matching_case ==="."){
            j++;
        }
        //else if matching_case !== letter
        else{
            return false
        }
        
    }
    //special case where star is the last states (MULTIPLE)
    while(j<p.length){
        if(p[j].length<2){
            return false;
        }
        j++;
    }
    //if we haven't consumed all states, return false;
    return j===p.length;
}