import {Pipe, PipeTransform} from 'angular2/core';
import {Container} from '../containers/container';

@Pipe({name: 'vmwMemoryFormat'})
export class MemoryFormatPipe implements PipeTransform {
    
    transform(memoryValue: string): string {
        return this._formatBytes(Number.parseInt(memoryValue, 10), 2);
    }
    
    
   /**
    * Units for measuring storage, in magnitude order.
    */
   private _STORAGE_SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

   /**
    * Pretty formats the given size to a string in the closest size unit.
    *
    * Note, lifted from: http://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
    *
    * @param bytes
    *    Number of bytes to format.
    *
    * @param decimals
    *    Max number of decimals to display.
    *
    * @returns {string}
    *    Pretty formated size string.
    */
   private _formatBytes(bytes, decimals) {
      if(bytes == 0) return '0 Bytes';
      var k = 1024;
      var i = this._nearestStorageUnitIndex(bytes);
      return (bytes / Math.pow(k, i)).toFixed(decimals) + ' ' + this._STORAGE_SIZES[i];
   }

   /**
    * Returns an index from STORAGE_SIZES for the storage unit most closely matching
    * the given number of bytes.
    *
    * @param bytes
    *    The bytes to find the storage unit index for.
    *
    * @returns {any}
    *    Index from STORAGE_SIZES
    */
   private _nearestStorageUnitIndex(bytes: number): number {
      if (bytes === 0) {
         return 0;
      }
      var k = 1024;
      return Math.floor(Math.log(bytes) / Math.log(k));
   }    
    
}