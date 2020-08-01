<?
namespace Accorsys;
/**
 * User: Gvammer
 * Date: 03.02.14
 * Time: 15:28
 * CodeAnalizator.php
 */

class CodeAnalizator {
    const STEP_IN = 1;
    const STEP_OUT = 2;
    const END_BLOCK = 3;
    const NEXT_BLOCK = 4;

    private $stack;
    private $currentPath;
    private $currentFileContent;
    private $openColon;

    private $loadedContent;
    private $currentPosition;
    private $outCondition;

    public function __construct($filePath){
        $this->currentFileContent = file_get_contents($filePath);
        $this->currentPath = $filePath;
//        $this->stack = new \Stack();
    }

    private function clearLocal(){

    }

    private function stepTo($condition){
        while ($this->step($condition) !== false);
        return $this->currentPosition;
    }

    private function step($condition){
        $this->currentPosition++;
        $currentChar = $this->currentFileContent[$this->currentPosition];
        if ($currentChar === null)
            return false;

        if ($currentChar == '{'){
            $this->stepIn();
            if ($condition == self::STEP_IN) return false;
        }

        if ($currentChar == '}'){
            $this->stepOut();
            if ($condition == self::STEP_OUT) return false;
            if ($condition == self::END_BLOCK && $this->isNullDepth()) return false;
        }

        return $this->currentFileContent[$this->currentPosition];
    }

    private function setPosition($pos){
        $this->currentPosition = $pos;
    }

    private function getPosition(){

    }

    private function updateFile(){
        $f = fopen($this->currentPath, 'w');
        fputs($f, $this->currentFileContent);
        fclose($f);
    }

    private function resetVisibilityArea(){
        $this->openColon = 0;
    }

    private function stepIn(){
        $this->openColon++;
    }

    private function stepOut(){
        $this->openColon--;
    }

    private function isNullDepth(){
        return $this->openColon == 0;
    }

    public function replaceFunction($functionName, $newFunctionText){
        $fstr = 'function '.$functionName.'(';
        $fpos = strpos($this->currentFileContent, $fstr);
        $this->resetVisibilityArea();
        $this->setPosition($fpos);
        $endpos = $this->stepTo(self::END_BLOCK);
        $endpos++;

        $this->currentFileContent = substr_replace($this->currentFileContent, $newFunctionText, $fpos, $endpos - $fpos);
        $this->updateFile();
    }
} ?>