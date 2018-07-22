export default class Scheduller {

    fifo = (procs) => {
        let globalValue = 0;
        let totalValue = 0;
        let texec = 0;
        let proclist = [];
        let count = 0;

        procs.sort((a, b) => {
            return (a.tc > b.tc) ? 1 : ((a.tc < b.tc) ? -1 : 0)
        });
        procs.forEach(element => {

            //dados para o grafico
            proclist.push(
                [ element.id,'Espera', new Date(0,0,0,0,0,element.tc), new Date(0,0,0,0,0,texec) ],
                [ element.id,'Execução', new Date(0,0,0,0,0,texec), new Date(0,0,0,0,0,element.te+texec) ]
            );
            count++;

            texec += element.te;

            //calculo
            (totalValue += -element.tc + element.te);
            globalValue += totalValue;
            console.log("fifo " + globalValue/procs.length);
            console.log(proclist);
        });

        return {
            proclist:proclist
        }
    }

    sjf = (procs) => {
        let globalValue = 0;
        let totalValue = 0;
        let proclist = [];
        let texec = 0;
        let count = 0;

        procs.sort((a, b) => {
            return (a.te > b.te && a.tc > b.tc ) ? 1 : ((a.te < b.te && a.tc < b.tc) ? -1 : (a.te > b.te && a.tc < b.tc) ? -1 : (a.te < b.te && a.tc > b.tc) ? 1 : (a.te < b.te && a.tc == b.tc) ? -1: (a.te > b.te && a.tc == b.tc) ? 1 : 0)
        });
        procs.forEach(element => {

            //dados para o grafico
            proclist.push(
                [ element.id,'Espera', new Date(0,0,0,0,0,element.tc), new Date(0,0,0,0,0,texec) ],
                [ element.id,'Execução', new Date(0,0,0,0,0,texec), new Date(0,0,0,0,0,element.te+texec) ]
            );
            count++;

            texec += element.te;

            //calculo
            (totalValue += -element.tc + element.te);
            globalValue += totalValue;
        });

        return {
            proclist:proclist
        }
    }

    rr = (procs,q,o) => {
        let globalValue = 0;
        let totalValue = 0;
        let proclist = [];
        let rem_bt = [];
        let count = 0;
        let texec = 0;

        procs.sort((a, b) => {
            return (a.tc > b.tc) ? 1 : ((a.tc < b.tc) ? -1 : 0)
        });

        procs.map(element => {
            rem_bt.push({
                id:element.id,
                tc:element.tc,
                te:element.te,
                dl:element.dl,
                pr:element.pr,
                wt:0,
                t:0
            });
            count++;
        });

        //console.log("teste " + rem_bt.reduce((preVal, element) => preVal + element.te ,0))

        while (rem_bt.reduce((preVal, element) => preVal + element.te ,0) > 0) {

            rem_bt.forEach(element => {
                //dados para o grafico
                if(element.t === 0){
                    proclist.push(
                        [ element.id,'Espera',   new Date(0,0,0,0,0,element.tc), new Date(0,0,0,0,0,totalValue)],
                        [ element.id,'Execução', new Date(0,0,0,0,0,totalValue), new Date(0,0,0,0,0,totalValue + q)],
                        [ element.id,'OH',       new Date(0,0,0,0,0,totalValue + q), new Date(0,0,0,0,0,totalValue + q + o)]
                    );

                    element.t += q

                    totalValue += q + o;

                    element.te -= q;

                    if(element.te > 0){
                        rem_bt.push(element);
                        rem_bt.pop(rem_bt[0]);
                    }
                }
                else if(element.t > 0){
                    if (element.te > q) {
                        proclist.push(
                            [ element.id,'Execução', new Date(0,0,0,0,0,totalValue), new Date(0,0,0,0,0,totalValue + q)],
                            [ element.id,'OH',       new Date(0,0,0,0,0,totalValue + q), new Date(0,0,0,0,0,totalValue + q + o)]
                        );

                        element.t += q;
                        totalValue += q + o;
                        element.te -= q;

                        if(element.te > 0){
                            rem_bt.push(element);
                            rem_bt.pop(rem_bt[0]);
                        }                      
                    } else {
                        if(element.te > 0){
                            proclist.push(
                                [ element.id,'Execução', new Date(0,0,0,0,0,totalValue), new Date(0,0,0,0,0,totalValue + element.te)],
                            );
                            element.t += element.te;
                            totalValue += element.te;
                            element.te = 0;
                        }                   
                    }                    
                }
            });
        }

        
        console.log(totalValue);
        return{
            proclist:proclist
        };
    }

    edf = (procs,q,o) => {
        let globalValue = 0;
        let totalValue = 0;
        let proclist = [];
        let rem_bt = [];
        let count = 0;
        let texec = 0;

        procs.sort((a, b) => {
            return (a.dl > b.dl) ? 1 : ((a.dl < b.dl) ? -1 : 0)
        });

        procs.map(element => {
            rem_bt.push({
                id:element.id,
                tc:element.tc,
                te:element.te,
                dl:element.dl,
                pr:element.pr,
                wt:0,
                t:0
            });
            count++;
        });

        //console.log("teste " + rem_bt.reduce((preVal, element) => preVal + element.te ,0))

        while (rem_bt.reduce((preVal, element) => preVal + element.te ,0) > 0) {

            rem_bt.forEach(element => {
                //dados para o grafico
                if(element.t === 0){
                    proclist.push(
                        [ element.id,'Espera',   new Date(0,0,0,0,0,element.tc), new Date(0,0,0,0,0,totalValue)],
                        [ element.id,'Execução', new Date(0,0,0,0,0,totalValue), new Date(0,0,0,0,0,totalValue + q)],
                        [ element.id,'OH',       new Date(0,0,0,0,0,totalValue + q), new Date(0,0,0,0,0,totalValue + q + o)]
                    );

                    element.t += q

                    totalValue += q + o;

                    element.te -= q;

                    if(element.te > 0){
                        rem_bt.push(element);
                        rem_bt.pop(rem_bt[0]);
                    }
                }
                else if(element.t > 0){
                    if (element.te > q) {
                        proclist.push(
                            [ element.id,'Execução', new Date(0,0,0,0,0,totalValue), new Date(0,0,0,0,0,totalValue + q)],
                            [ element.id,'OH',       new Date(0,0,0,0,0,totalValue + q), new Date(0,0,0,0,0,totalValue + q + o)]
                        );

                        element.t += q;
                        totalValue += q + o;
                        element.te -= q;

                        if(element.te > 0){
                            rem_bt.push(element);
                            rem_bt.pop(rem_bt[0]);
                        }                      
                    } else {
                        if(element.te > 0){
                            proclist.push(
                                [ element.id,'Execução', new Date(0,0,0,0,0,totalValue), new Date(0,0,0,0,0,totalValue + element.te)],
                            );
                            element.t += element.te;
                            totalValue += element.te;
                            element.te = 0;
                        }                   
                    }                    
                }
            });
        }

        
        console.log(totalValue);
        return{
            proclist:proclist
        };
    }

}