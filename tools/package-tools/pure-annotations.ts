/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import { readFileSync, writeFileSync } from 'fs';

/** Regex that matches downleveled class IIFE expressions. Used to add the pure annotations. */
const classIfeeRegex =
   new RegExp('^(var (\\S+) = )(\\(function \\(\\) \\{[\\n\\r]*(?:    (?:\\/\\*\\*| \\*|\\*\\/|' +
      '\\/\\/)[^\\n\\r]*[\\n\\r]*)*    function \\2\\([^\\)]*\\) \\{[\\n\\r]*)', 'mg');

/** Regex that matches downleveled class IIFE expressions with _extends statements */
const classExtendsIfeeRegex =
   /^(var (\S+) = )(\(function \(_super\) {[\n\r]*    tslib.*\.__extends\(\2, _super\);[\n\r]*)/gm;

/**
 * Adds `@__PURE__` annotation comments to IIFEs containing ES5-downleveled classes generated by
 * TypeScript so that Uglify can tree-shake classes that are not referenced.
 *
 * @param fileContent The content of the file for which `@__PURE__` will be added.
 * @returns The content of the file with `@__PURE__` annotations added.
 */
export function addPureAnnotations(fileContent: string): string {
   return fileContent
      // Prefix downleveled classes w/ the @__PURE__ annotation.
      .replace(classIfeeRegex, '$1/*@__PURE__*/$3')
      // Prefix downleveled classes that extend another class w/ the @__PURE__ annotation
      .replace(classExtendsIfeeRegex, '$1/*@__PURE__*/$3');
}

/** Adds Uglify "@__PURE__" decorations to the specified file. */
export function addPureAnnotationsToFile(inputFile: string): void {
   const originalContent = readFileSync(inputFile, 'utf-8');
   const annotatedContent = addPureAnnotations(originalContent);

   writeFileSync(inputFile, annotatedContent, { encoding: 'utf-8' });
}
