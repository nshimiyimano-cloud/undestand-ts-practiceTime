//utilizing interface to implement drag and drop

namespace App{  //you import in file.ts have same lime like this namespace if not that u wil loose this interface
    
//now these interface is available only in this namespace to make it public able accessed outside of this namespace and of this file use export keyword

    export interface Draggable{
        dragStartHandler(event:DragEvent):void;
        dragEndHanler(event:DragEvent):void;
    }
    
    
    export interface DragTarget{
    dragOverHandler(event:DragEvent):void; //signal the browser and javascript that the thing you're dragging something over is a valid drag target. If you don't do the right thing in the drag over handler dropping will not be possible.
    dropHandler(event:DragEvent):void; //You need to drop handler then to react to the actual drop that happens. here you can update UI(user interface)
    dragLeaveHandler(event:DragEvent):void; //example giving some visual feedback to the user when he or she drag something over the box.For example we change the background color.Well if no drop happens and instead it's cancelled or the user removes the element away we can use thedrag leaf handler to revert our visual update.
    }


}
