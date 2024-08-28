import OperationTreeNode from "@/app/(main)/calculator/_lib/OperationTreeNode";

export class OperationTree {
    private static isOperation(c: string) {
        return ["+", "-", "*", "/"].includes(c);
    }

    private static findCloseBracketIndex(formula: string, start: number) {
        let index = -1;
        let depth = 1;
        for (let i = start + 1; i < formula.length; i++) {
            if (formula.charAt(i) === ")") {
                depth--;
                if (depth === 0) {
                    index = i;
                    break;
                }
            } else if (formula.charAt(i) === "(") {
                depth++;
            }
        }
        if (depth > 0) throw new Error("Invalid formula!");
        return index;
    }

    private static privateConstruct(formula: string, start: number, end: number) {
        console.log(formula, start, end);
        let left: number | OperationTreeNode = NaN;
        let operationIndex = -1;
        if (formula.startsWith("(")) {
            const newEnd = this.findCloseBracketIndex(formula, start);
            left = this.privateConstruct(formula, start+1, newEnd-1).Root;
        } else {
            let leftStr = "";
            for (let i = start; i <= end; i++) {
                if (!this.isOperation(formula.charAt(i))) {
                    leftStr += formula.charAt(i);
                } else {
                    operationIndex = i;
                    break;
                }
            }
            let root: OperationTreeNode;
            if (operationIndex > 0) {
                // root = new OperationTreeNode();
            } else {
                left = parseInt(leftStr);
            }
        }
        // const root = new OperationTree("", left, )
        return new OperationTree(root);
    }

    static construct(formula: string) {
        return this.privateConstruct(formula, 0, formula.length-1);
    }

    private constructor(private readonly root: OperationTreeNode) {}

    get Root() {
        return this.root;
    }
}