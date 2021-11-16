import TypeSocket from './TypeSocket';
import {typeType} from '../../block-types/types';

export default class PropOutputSocket extends TypeSocket {
    constructor(nodeId, nodeName, prop, typeCompiler) {
        super(prop.type);

        this.nodeId = nodeId;
        this.nodeName = nodeName;
        this.prop = prop;
        this.typeCompiler = typeCompiler;

        this._isTypeOfType = typeType.isSubtype(this.prop.type);
    }

    findType() {
        if(this.typeCompiler.editor.silent) {
            return super.findType();
        }

        try {
            let type = this.typeCompiler.getOutput(this.nodeId, this.prop.key);
            if(type) {
                if(this._isTypeOfType) {
                    if(typeType.isSubtype(type)) {
                        console.warn('Type of Type of Type (Intentional?)');
                    }
                    type = typeType.of(type);
                }
                return type || super.findType();
            }
        }
        catch(err) {
            console.warn(`Error on socket [${this.nodeName}.${this.prop.key}]:`, err);///
        }
        return super.findType();
    }

    // compatibleWith(other) {
    //     if(!('findType' in other)) {
    //         return;
    //     }
    //     let reversed = !!this.data.reversed;
    //     if(reversed === !other.data.reversed) {
    //         return false;
    //     }
    //     let self = this;
    //     if(!reversed) {
    //         [self, other] = [other, self];
    //     }
    //     let selfType = self.findType();
    //     let otherType = other.findType();
    //
    //     console.log(selfType, otherType);
    //
    //     return selfType && selfType.isSubtype(otherType);
    // }
}