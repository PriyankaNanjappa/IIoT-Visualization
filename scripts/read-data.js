/**
 * Created by mayes on 1/24/2018.
 */

var final_data = {
    "name": "flare",
    "children": []
};

var colIndex = 0;

function readData(){
    var myData = data.results.bindings;
    console.log(myData.length);
    console.log(final_data.children);

    for(var i in myData){
        var obj = myData[i];
        var standard = parse(obj.std.value);
        var classification = parse(obj.classification.value);
        var initiative = parse(obj.initiative.value);

        pushInitiative(initiative, classification, standard);
    }
    console.log(JSON.stringify(final_data));
}

function pushInitiative(initiative, classification, standard){
    if(final_data.children.length === 0){
        final_data.children.push({"name" : initiative, "colIndex": colIndex, "children":[]});
        colIndex++;
    }
    else{
        for(var k in final_data.children){
            var flag = 0;
            var intv = final_data.children[k];
            if(intv.name === initiative){
                //exists already!
                flag = 1;
                pushClassification(classification, k, standard)
            }
        }
        //didn't find it
        if(flag === 0){
            final_data.children.push({"name" : initiative, "colIndex": colIndex, "children":[]});
            colIndex++;
        }
    }
}

function pushClassification(classification, parentIndex, standard){
    var intv = final_data.children[parentIndex];
    if(intv.children.length === 0){
        intv.children.push({"name" : classification, "colIndex": intv.colIndex, "children":[]});
    }
    else{
        for(var k in intv.children){
            var flag = 0;
            var clsf = intv.children[k];
            if(clsf.name === classification){
                //exists already!
                flag = 1;
                pushStandard(standard, parentIndex, k)
            }
        }
        //didn't find it
        if(flag === 0){
            intv.children.push({"name" : classification, "colIndex": intv.colIndex, "children":[]});
        }
    }
}

function pushStandard(standard, grandparentIndex, parentIndex){
    var clsf = final_data.children[grandparentIndex].children[parentIndex];
    if(clsf.children.length === 0){
        clsf.children.push({"name" : standard, "colIndex": clsf.colIndex, size: 100});
    }
    else{
        for(var k in clsf.children){
            var flag = 0;
            var std = clsf.children[k];
            if(std.name === standard){
                //exists already!
                flag = 1;
            }
        }
        //didn't find it
        if(flag === 0){
            clsf.children.push({"name" : standard, "colIndex": clsf.colIndex, size: 100});
        }
    }
}



function parse(string){
    return string.split('#')[1]
}

function match(element) {
    return element > 10;
}