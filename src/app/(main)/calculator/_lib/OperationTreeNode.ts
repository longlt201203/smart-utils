export default class OperationTreeNode {
    private readonly value: number;
    constructor(
        private readonly operation: string,
        private readonly left: number | OperationTreeNode,
        private readonly right: number | OperationTreeNode
    ) {
        let leftValue = NaN;
        let rightValue = NaN;
        if (left instanceof OperationTreeNode) {
            leftValue = left.Value;
        } else {
            leftValue = left;
        }
        if (right instanceof OperationTreeNode) {
            rightValue  = right.Value;
        } else {
            rightValue = right;
        }
        switch (operation) {
            case "+":
                this.value = leftValue + rightValue;
                break;
            case "-":
                this.value = leftValue - rightValue;
                break;
            case "*":
                this.value = leftValue * rightValue;
                break;
            case "/":
                this.value = leftValue / rightValue;
                break;
            default:
                throw new Error("Invalid operation");
        }
    }

    get Value() {
        return this.value;
    }

}