<?
/**
 * User: Gvammer
 * Date: 03.02.14
 * Time: 21:03
 * stack.php
 */
class Stack {

    /**
     * Holds an elements array for stack
     *
     * @var array
     */
    protected $elements;

    /**
     * Constructor returns empty stack
     */
    public function __construct() {
        $this->elements = array();
    }

    /**
     * Returns top element of stack
     *
     * @return mixed Top element of stack
     */
    public function top() {
        if ($this->isEmpty())
            throw new Exception('Trying to get top element of empty stack!', 1307861850);
        return end($this->elements);
    }



    /**
     * Pushes an element upon the stack
     *
     * @param mixed $element
     */
    public function push($element) {
        $this->elements[] = $element;
    }



    /**
     * Pops element from stack and returns popped stack
     *
     * @return Stack
     */
    public function pop() {
        if ($this->isEmpty())
            throw new Exception('Trying to pop an empty stack!', 1307861851);
        array_pop($this->elements);
        return $this;
    }



    /**
     * Returns true, if stack is empty
     *
     * @return bool Returns true, if stack is empty
     */
    public function isEmpty() {
        return empty($this->elements);
    }



    /**
     * Returns a string representation of this stack
     *
     * @return string
     */
    public function toString() {
        $string = '';
        foreach (array_reverse($this->elements) as $node) {
            $string .= $node->toString();
        }
        return $string;
    }

}
?>