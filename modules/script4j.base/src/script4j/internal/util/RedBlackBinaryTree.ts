/*
 * Copyright (c) 2018-2019 Pavel Kastornyy. All rights reserved.
 * The specified copyright does not cover application programming interface
 * (API) and the documentation for this API, which were taken from other
 * libraries. See NOTICE file for more information.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation. Copyright holder designates
 * this particular file as subject to the "Classpath" exception as provided
 * by copyright holder in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 */

import { Comparator } from './../../util/Comparator';
import { Consumer } from './../../util/function/Consumer';
import { Predicate } from './../../util/function/Predicate';

export class RedBlackBinaryTree<T> {
    
    private readonly comparator: Comparator<T>;
    
    private rootNode: RedBlackBinaryTree.Node<T> = null;
    
    private treeSize: number = 0;

    /**
     * From user or someone from TreeMap.
     */
    constructor(comparator: Comparator<T>) {
        this.comparator = comparator;
    }

    /**
     * Returns the previous value.
     */
    public add(value: T): T  {
        if (this.rootNode === null) {
            this.rootNode = new RedBlackBinaryTree.Node(value);
            this.rootNode.setColor(RedBlackBinaryTree.Color.BLACK);
            this.treeSize++;
            return null;
        }
        let node: RedBlackBinaryTree.Node<T> = this.rootNode;
        let previous: T = null;
        do {
            const result: number = this.comparator(value, node.getValue());
            if (result === 0) {
                previous = node.getValue();
                node.setValue(value);
                break;
            } else if (result > 0) {
                if (node.getRight() === null) {
                    const newNode: RedBlackBinaryTree.Node<T> = new RedBlackBinaryTree.Node(value);
                    node.setRight(newNode);
                    this.treeSize++;
                    this.balanceAfterInsertion(newNode);
                    break;
                } else {
                    node = node.getRight();
                }
            } else {
                if (node.getLeft() === null) {
                    const newNode: RedBlackBinaryTree.Node<T> = new RedBlackBinaryTree.Node(value);
                    node.setLeft(newNode);
                    this.treeSize++;
                    this.balanceAfterInsertion(newNode);
                    break;
                } else {
                    node = node.getLeft();
                }
            }
        } while (true);
        return previous;
    }

    public remove(value: T): void {
        let node: RedBlackBinaryTree.Node<T> = this.findNode(value);
        this.removeNode(node);
    }
    
    public clear(): void {
        this.rootNode = null;
        this.treeSize = 0;
    }
    
    public size(): number {
        return this.treeSize;
    }
    
    public getRootNode() {
        return this.rootNode;
    }
    
    /**
     * Removes only one node. Its children are left.
     */
    public removeNode(node: RedBlackBinaryTree.Node<T>): void {
        if (node === null) {
            return;
        } else if (node.getLeft() !== null && node.getRight() !== null) {
            //a special way of removing nodes in binary trees
            const mostRight: RedBlackBinaryTree.Node<T> = this.getPredecessorOf(node);
            node.setValue(mostRight.getValue());
            //now mostRight will be removed
            node = mostRight;
        }
        let child: RedBlackBinaryTree.Node<T> = this.getLeftOf(node) === null ? this.getRightOf(node) : this.getLeftOf(node);
        if (child !== null) {
            if (node === this.rootNode) {
                this.rootNode = child;
            } else if (node.getParent().getLeft() === node) {
                node.getParent().setLeft(child);
            } else {
                node.getParent().setRight(child);
            }
            if (this.isBlack(node)) {
                this.balanceAfterRemoval(child);
            }
        } else if (node === this.rootNode) {
            this.rootNode = null;
        } else {
            if (this.isBlack(node)) {
                this.balanceAfterRemoval(node);
            }
            node.removeFromParent();
        }
        this.treeSize--;
    }
    
    public countNodes(node: RedBlackBinaryTree.Node<T>): number {
        if (node === null) {
            return 0;  
        }
        return (1 + this.countNodes(node.getLeft()) + this.countNodes(node.getRight()));  
    }
    
    public findNode(value: T): RedBlackBinaryTree.Node<T> {
        if (this.rootNode === null) {
            return null;
        }
        let node: RedBlackBinaryTree.Node<T>;
        node = this.rootNode;
        do { 
            let result: number = this.comparator(value, node.getValue());
            if (result === 0) {
                return node;
            } else if (result < 0) {
                node = node.getLeft();
            } else {
                node = node.getRight();
            }
        } while(node !== null);
        return null;
    }
    
    /**
     * Traverses tree and invokes consumer in accending order of value on all nodes.
     */
    public traverseAndConsume(consumer: Consumer<T>, ): void {
        this.traverseWithoutCondition(consumer, this.rootNode);
    }
    
    /**
     * Traverses until predicate returns true.
     */
    public traverseAndTest(predicate: Predicate<T>, ): boolean {
        return this.traverseWithCondition(predicate, this.rootNode);
    }
    
    /**
     * If a node K is called the inorder predecessor of node N then N(!) must be visited immediately after K(!) in a 
     * inorder traversal of the tree. Below is a more formal definition of Inorder Predecessor:
     * 1) If the node has a left sub-tree, then inorder predecessor is the right most node of the left sub-tree.
     * 2) If the node doesn't have a left sub-tree, then it is the first ancestor (when we move up from node to root) 
     * whose right sub-tree contains this node.
     * See: http://techieme.in/inorder-predecessor-of-node-in-binary-tree/
     */
    public getPredecessorOf(node: RedBlackBinaryTree.Node<T>): RedBlackBinaryTree.Node<T> {
        if (node == null) {
            return null;
        }
        if (node.getLeft() !== null) {
            node = node.getLeft();
            while (node.getRight() != null) {
                node = node.getRight();
            }
            return node;
        }
        let p: RedBlackBinaryTree.Node<T> = node.getParent();
        while (p !== null && p.getLeft() === node) {
            node = p;
            p = p.getParent();
        }
        return p;
   }
    
    /**
     * If a node K is called the inorder successor of node N then K(!) must be visited immediately after N(!) in a 
     * inorder traversal of the tree. Below is a more formal definition of Inorder Successor:
     * 1) If the node has a right sub-tree, then inorder successor is the left most node of the right sub-tree.
     * 2) If the node doesn't have a right sub-tree, then it is the first ancestor (when we move up from node to root) 
     * whose left sub-tree contains this node.
     * See: http://techieme.in/inorder-successor-of-node-in-binary-tree/
     */
    public getSuccessorOf(node: RedBlackBinaryTree.Node<T>): RedBlackBinaryTree.Node<T> {
        if (node === null) {
            return null;
        }
        if (node.getRight() !== null) {
            node = node.getRight();
            while (node.getLeft() !== null) {
                node = node.getLeft();
            }
            return node;
        }
        let p: RedBlackBinaryTree.Node<T> = node.getParent();
        while (p !== null && p.getRight() === node) {
            node = p;
            p = p.getParent();
        }
        return p;
    }
    
    public getFirstNode(): RedBlackBinaryTree.Node<T> {
        let node: RedBlackBinaryTree.Node<T> = this.rootNode;
        if (node.getLeft() !== null) {
            while (node.getLeft() !== null) {
                node = node.getLeft();
            }
        } else if (node.getRight() !== null) {
            node = node.getRight();
            while (node.getLeft() !== null) {
                node = node.getLeft();
            }
        }
        return node;
    }
    
    private traverseWithoutCondition(consumer: Consumer<T>, node: RedBlackBinaryTree.Node<T>): void {
        if (node !== null) {
            this.traverseWithoutCondition(consumer, node.getLeft());
            consumer(node.getValue());
            this.traverseWithoutCondition(consumer, node.getRight());
        }
    }    
    
    private traverseWithCondition(predicate: Predicate<T>, node: RedBlackBinaryTree.Node<T>): boolean {
        if (node !== null) {
            if (this.traverseWithCondition(predicate, node.getLeft())) {
                return true;
            }
            if (predicate(node.getValue())) {
                return true;
            }
            return this.traverseWithCondition(predicate, node.getRight());
        } else {
            return false;
        }
    }    
    
    private balanceAfterInsertion(node: RedBlackBinaryTree.Node<T>): void {
        this.setColorFor(node, RedBlackBinaryTree.Color.RED);
        if (node !== null && node !== this.rootNode && this.isRed(this.getParentOf(node))) {
            if (this.isRed(this.getSiblingOf(this.getParentOf(node)))) {
                this.setColorFor(this.getParentOf(node), RedBlackBinaryTree.Color.BLACK);
                this.setColorFor(this.getSiblingOf(this.getParentOf(node)), RedBlackBinaryTree.Color.BLACK);
                this.setColorFor(this.getGrandparentOf(node), RedBlackBinaryTree.Color.RED);
                this.balanceAfterInsertion(this.getGrandparentOf(node));
            }
            else if (this.getParentOf(node) === this.getLeftOf(this.getGrandparentOf(node))) {
                if (node === this.getRightOf(this.getParentOf(node))) {
                    node = this.getParentOf(node);
                    this.rotateLeft(node);
                }
                this.setColorFor(this.getParentOf(node), RedBlackBinaryTree.Color.BLACK);
                this.setColorFor(this.getGrandparentOf(node), RedBlackBinaryTree.Color.RED);
                this.rotateRight(this.getGrandparentOf(node));
            }
            else if (this.getParentOf(node) === this.getRightOf(this.getGrandparentOf(node))) {
                if (node === this.getLeftOf(this.getParentOf(node))) {
                    node = this.getParentOf(node);
                    this.rotateRight(node);
                }
                this.setColorFor(this.getParentOf(node), RedBlackBinaryTree.Color.BLACK);
                this.setColorFor(this.getGrandparentOf(node), RedBlackBinaryTree.Color.RED);
                this.rotateLeft(this.getGrandparentOf(node));
            }
        }
        this.setColorFor(this.rootNode, RedBlackBinaryTree.Color.BLACK);
        this.rootNode.setParent(null);
    }

    private balanceAfterRemoval(node: RedBlackBinaryTree.Node<T>): void {
        while (node !== this.rootNode && this.isBlack(node)) {
            if (node === this.getLeftOf(this.getParentOf(node))) {
                let sibling: RedBlackBinaryTree.Node<T> = this.getRightOf(this.getParentOf(node));
                if (this.isRed(sibling)) {
                    this.setColorFor(sibling, RedBlackBinaryTree.Color.BLACK);
                    this.setColorFor(this.getParentOf(node), RedBlackBinaryTree.Color.RED);
                    this.rotateLeft(this.getParentOf(node));
                    sibling = this.getRightOf(this.getParentOf(node));
                }
                if (this.isBlack(this.getLeftOf(sibling)) && this.isBlack(this.getRightOf(sibling))) {
                    this.setColorFor(sibling, RedBlackBinaryTree.Color.RED);
                    node = this.getParentOf(node);
                } else {
                    if (this.isBlack(this.getRightOf(sibling))) {
                        this.setColorFor(this.getLeftOf(sibling), RedBlackBinaryTree.Color.BLACK);
                        this.setColorFor(sibling, RedBlackBinaryTree.Color.RED);
                        this.rotateRight(sibling);
                        sibling = this.getRightOf(this.getParentOf(node));
                    }
                    this.setColorFor(sibling, this.getColorOf(this.getParentOf(node)));
                    this.setColorFor(this.getParentOf(node), RedBlackBinaryTree.Color.BLACK);
                    this.setColorFor(this.getRightOf(sibling), RedBlackBinaryTree.Color.BLACK);
                    this.rotateLeft(this.getParentOf(node));
                    node = this.rootNode;
                }
            } else {
                let sibling: RedBlackBinaryTree.Node<T> = this.getLeftOf(this.getParentOf(node));
                if (this.isRed(sibling)) {
                    this.setColorFor(sibling, RedBlackBinaryTree.Color.BLACK);
                    this.setColorFor(this.getParentOf(node), RedBlackBinaryTree.Color.RED);
                    this.rotateRight(this.getParentOf(node));
                    sibling = this.getLeftOf(this.getParentOf(node));
                }
                if (this.isBlack(this.getLeftOf(sibling)) && this.isBlack(this.getRightOf(sibling))) {
                    this.setColorFor(sibling, RedBlackBinaryTree.Color.RED);
                    node = this.getParentOf(node);
                } else {
                    if (this.isBlack(this.getLeftOf(sibling))) {
                        this.setColorFor(this.getRightOf(sibling), RedBlackBinaryTree.Color.BLACK);
                        this.setColorFor(sibling, RedBlackBinaryTree.Color.RED);
                        this.rotateLeft(sibling);
                        sibling = this.getLeftOf(this.getParentOf(node));
                    }
                    this.setColorFor(sibling, this.getColorOf(this.getParentOf(node)));
                    this.setColorFor(this.getParentOf(node), RedBlackBinaryTree.Color.BLACK);
                    this.setColorFor(this.getLeftOf(sibling), RedBlackBinaryTree.Color.BLACK);
                    this.rotateRight(this.getParentOf(node));
                    node = this.rootNode;
                }
            }
        }
        this.setColorFor(node, RedBlackBinaryTree.Color.BLACK);
        if (this.rootNode !== null) {
            this.rootNode.setParent(null);
        }
    }
    
    private rotateLeft(node: RedBlackBinaryTree.Node<T>): void {
        if (node.getRight() === null) {
            return;
        }
        let oldRightNode: RedBlackBinaryTree.Node<T> = node.getRight();
        node.setRight(oldRightNode.getLeft());
        if (node.getParent() === null) {
            this.rootNode = oldRightNode;
        } else if (node.getParent().getLeft() === node) {
            node.getParent().setLeft(oldRightNode);
        } else {
            node.getParent().setRight(oldRightNode);
        }
        oldRightNode.setLeft(node);
    }    
    
    private rotateRight(node: RedBlackBinaryTree.Node<T>): void {
        if (node.getLeft() === null) {
            return;
        }
        let oldLeftNode: RedBlackBinaryTree.Node<T> = node.getLeft();
        node.setLeft(oldLeftNode.getRight());
        if (node.getParent() === null) {
            this.rootNode = oldLeftNode;
        } else if (node.getParent().getLeft() === node) {
            node.getParent().setLeft(oldLeftNode);
        } else {
            node.getParent().setRight(oldLeftNode);
        }
        oldLeftNode.setRight(node);
    }
    
    private isRed(node: RedBlackBinaryTree.Node<T>): boolean {
        return node !== null && this.getColorOf(node) === RedBlackBinaryTree.Color.RED;
    }

    private isBlack(node: RedBlackBinaryTree.Node<T>): boolean {
        return node === null || this.getColorOf(node) === RedBlackBinaryTree.Color.BLACK;
    }    

    private getColorOf(node: RedBlackBinaryTree.Node<T>): RedBlackBinaryTree.Color {
        return node === null ? RedBlackBinaryTree.Color.BLACK : node.getColor();
    }

    private setColorFor(node: RedBlackBinaryTree.Node<T>, color: RedBlackBinaryTree.Color): void {
        if (node !== null) {
            node.setColor(color);
        }
    }

    private getParentOf(node: RedBlackBinaryTree.Node<T>): RedBlackBinaryTree.Node<T> {
        return node === null ? null : node.getParent();
    }

    private getGrandparentOf(node: RedBlackBinaryTree.Node<T>): RedBlackBinaryTree.Node<T> {
        if (node === null || node.getParent() === null) {
            return null;
        } else {
            return node.getParent().getParent();
        }
    }

    private getSiblingOf(node: RedBlackBinaryTree.Node<T>): RedBlackBinaryTree.Node<T> {
        if (node === null || node.getParent() === null) {
            return null;
        } else {
            if (node === node.getParent().getLeft()) {
                return node.getParent().getRight();
            } else {
                return node.getParent().getLeft();
            }
        }
    }

    private getLeftOf(node: RedBlackBinaryTree.Node<T>): RedBlackBinaryTree.Node<T> {
        return node == null ? null : node.getLeft();
    }

    private getRightOf(node: RedBlackBinaryTree.Node<T>): RedBlackBinaryTree.Node<T> {
        return node == null ? null : node.getRight();
    }
}

export namespace RedBlackBinaryTree {
    
    export enum Color {
        RED = 1, BLACK = 2
    }

    export class Node<T> {
        
        /**
         * Value can change, when we add the node with same key - we just replace value in node.
         */
        private value: T;
        
        private color: RedBlackBinaryTree.Color = null;
        
        private left: Node<T> = null;
        
        private right: Node<T> = null;
        
        private parent: Node<T> = null;

        constructor(value: T) {
            this.value = value;
        }
        
        public getValue(): T {
            return this.value;
        }
        
        public setValue(value: T) {
            this.value = value;
        }
        
        public getColor(): RedBlackBinaryTree.Color {
            return this.color;
        }
        
        public setColor(color: RedBlackBinaryTree.Color) {
            this.color = color;
        }
        
        public getParent(): Node<T> {
            return this.parent;
        }
        
        public setParent(parent: Node<T>) {
            this.parent = parent;
        }
        
        public getLeft(): Node<T> {
            return this.left;
        }
        
        public setLeft(left: Node<T>) {
            this.left = left;
            if (left !== null) {
                this.left.setParent(this);
            }
        }
        
        public getRight(): Node<T> {
            return this.right;
        }
        
        public setRight(right: Node<T>) {
            this.right = right;
            if (right !== null) {
                this.right.setParent(this);
            }            
        }
        
        public removeFromParent(): void {
            if (this.parent !== null) {
                if (this.parent.left === this) {
                    this.parent.left = null;
                } else if (this.parent.right === this) {
                    this.parent.right = null;
                }
                this.parent = null;
            }
        }
    }
}

   