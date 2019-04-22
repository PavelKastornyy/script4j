/*
 * Copyright (c) 2018-2019 Pavel Kastornyy. All rights reserved.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.
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

import { assert } from 'chai';
import { describe } from 'mocha';
import { it } from 'mocha';
import { Comparator } from './../../../../src/script4j/util/Comparator';
import { RedBlackBinaryTree } from './../../../../src/script4j/internal/util/RedBlackBinaryTree';

describe('RedBlackBinaryTree', () => {
    
    const comparator: Comparator<number> = Comparator.fromFunc<number>((o1: number, o2: number): number => {
        if (o1 < o2) {
            return -1;
        } else if (o1 === o2) { 
            return 0;
        } else if (o1 > o2){
            return +1;
        }
    });

    it('add_numbers_addedAndSorted', () => {
        let tree: RedBlackBinaryTree<number> = new RedBlackBinaryTree(comparator);
        tree.add(100);
        tree.add(110);
        tree.add(120);
        tree.add(130);
        tree.add(140);
        tree.add(150);
        tree.add(160);
        tree.add(170);
        tree.add(180);
        let node: RedBlackBinaryTree.Node<number> = tree.getRootNode();//level 1
        assert.equal(node.getValue(), 130);
        assert.equal(node.getColor(), RedBlackBinaryTree.Color.BLACK);
        //left subree
        node = node.getLeft();//level 2
        assert.equal(node.getValue(), 110);
        assert.equal(node.getColor(), RedBlackBinaryTree.Color.RED);
        node = node.getLeft();//level 3
        assert.equal(node.getValue(), 100);
        assert.equal(node.getColor(), RedBlackBinaryTree.Color.BLACK);
        assert.equal(node.getLeft(), null);
        assert.equal(node.getRight(), null);
        node = node.getParent().getRight();//level 3
        assert.equal(node.getValue(), 120);
        assert.equal(node.getColor(), RedBlackBinaryTree.Color.BLACK);
        assert.equal(node.getLeft(), null);
        assert.equal(node.getRight(), null);
        //right subree
        node = tree.getRootNode().getRight();//level 2
        assert.equal(node.getValue(), 150);
        assert.equal(node.getColor(), RedBlackBinaryTree.Color.RED);
        node = node.getLeft();//level 3
        assert.equal(node.getValue(), 140);
        assert.equal(node.getColor(), RedBlackBinaryTree.Color.BLACK);
        assert.equal(node.getLeft(), null);
        assert.equal(node.getRight(), null);
        node = node.getParent().getRight();//level 3
        assert.equal(node.getValue(), 170);
        assert.equal(node.getColor(), RedBlackBinaryTree.Color.BLACK);
        node = node.getLeft();//level 4
        assert.equal(node.getValue(), 160);
        assert.equal(node.getColor(), RedBlackBinaryTree.Color.RED);
        assert.equal(node.getLeft(), null);
        assert.equal(node.getRight(), null);
        node = node.getParent().getRight();//level 4
        assert.equal(node.getValue(), 180);
        assert.equal(node.getColor(), RedBlackBinaryTree.Color.RED);
        assert.equal(node.getLeft(), null);
        assert.equal(node.getRight(), null);
    });
    
    it('getFirstNode_nonEmptyTree_firstNode', () => {
        let tree: RedBlackBinaryTree<number> = new RedBlackBinaryTree(comparator);
        tree.add(100);
        tree.add(110);
        tree.add(120);
        tree.add(130);
        tree.add(140);
        tree.add(150);
        tree.add(160);
        tree.add(170);
        tree.add(180);
        let node: RedBlackBinaryTree.Node<number> = tree.getFirstNode();
        assert.equal(node.getValue(), 100);
    });    
    
    it('getLastNode_nonEmptyTree_lastNode', () => {
        let tree: RedBlackBinaryTree<number> = new RedBlackBinaryTree(comparator);
        tree.add(100);
        tree.add(110);
        tree.add(120);
        tree.add(130);
        tree.add(140);
        tree.add(150);
        tree.add(160);
        tree.add(170);
        tree.add(180);
        let node: RedBlackBinaryTree.Node<number> = tree.getLastNode();
        assert.equal(node.getValue(), 180);
    });    
});

