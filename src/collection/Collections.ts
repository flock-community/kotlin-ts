// /**
//  * Returns an element at the given [index] or the result of calling the [defaultValue] function if the [index] is out of bounds of this list.
//  *
//  * @sample samples.collections.Collections.Elements.elementAtOrElse
//  */
// @kotlin.internal.InlineOnly
// public inline fun <T> List<T>.elementAtOrElse(index: Int, defaultValue: (Int) -> T): T {
//     return if (index >= 0 && index <= lastIndex) get(index) else defaultValue(index)
// }
//
// /**
//  * Returns an element at the given [index] or `null` if the [index] is out of bounds of this collection.
//  *
//  * @sample samples.collections.Collections.Elements.elementAtOrNull
//  */
// public fun <T> Iterable<T>.elementAtOrNull(index: Int): T? {
//     if (this is List)
//         return this.getOrNull(index)
//     if (index < 0)
//         return null
//     val iterator = iterator()
//     var count = 0
//     while (iterator.hasNext()) {
//         val element = iterator.next()
//         if (index == count++)
//             return element
//     }
//     return null
// }
//
// /**
//  * Returns an element at the given [index] or `null` if the [index] is out of bounds of this list.
//  *
//  * @sample samples.collections.Collections.Elements.elementAtOrNull
//  */
// @kotlin.internal.InlineOnly
// public inline fun <T> List<T>.elementAtOrNull(index: Int): T? {
//     return this.getOrNull(index)
// }
//
// /**
//  * Returns the first element matching the given [predicate], or `null` if no such element was found.
//  *
//  * @sample samples.collections.Collections.Elements.find
//  */
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.find(predicate: (T) -> Boolean): T? {
//     return firstOrNull(predicate)
// }
//
// /**
//  * Returns the last element matching the given [predicate], or `null` if no such element was found.
//  *
//  * @sample samples.collections.Collections.Elements.find
//  */
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.findLast(predicate: (T) -> Boolean): T? {
//     return lastOrNull(predicate)
// }
//
// /**
//  * Returns the last element matching the given [predicate], or `null` if no such element was found.
//  *
//  * @sample samples.collections.Collections.Elements.find
//  */
// @kotlin.internal.InlineOnly
// public inline fun <T> List<T>.findLast(predicate: (T) -> Boolean): T? {
//     return lastOrNull(predicate)
// }
//
// /**
//  * Returns first element.
//  * @throws [NoSuchElementException] if the collection is empty.
//  */
// public fun <T> Iterable<T>.first(): T {
//     when (this) {
//         is List -> return this.first()
//         else -> {
//             val iterator = iterator()
//             if (!iterator.hasNext())
//                 throw NoSuchElementException("Collection is empty.")
//             return iterator.next()
//         }
//     }
// }
//
// /**
//  * Returns first element.
//  * @throws [NoSuchElementException] if the list is empty.
//  */
// public fun <T> List<T>.first(): T {
//     if (isEmpty())
//         throw NoSuchElementException("List is empty.")
//     return this[0]
// }
//
// /**
//  * Returns the first element matching the given [predicate].
//  * @throws [NoSuchElementException] if no such element is found.
//  */
// public inline fun <T> Iterable<T>.first(predicate: (T) -> Boolean): T {
//     for (element in this) if (predicate(element)) return element
//     throw NoSuchElementException("Collection contains no element matching the predicate.")
// }
//
// /**
//  * Returns the first non-null value produced by [transform] function being applied to elements of this collection in iteration order,
//  * or throws [NoSuchElementException] if no non-null value was produced.
//  *
//  * @sample samples.collections.Collections.Transformations.firstNotNullOf
//  */
// @SinceKotlin("1.5")
// @kotlin.internal.InlineOnly
// public inline fun <T, R : Any> Iterable<T>.firstNotNullOf(transform: (T) -> R?): R {
//     return firstNotNullOfOrNull(transform) ?: throw NoSuchElementException("No element of the collection was transformed to a non-null value.")
// }
//
// /**
//  * Returns the first non-null value produced by [transform] function being applied to elements of this collection in iteration order,
//  * or `null` if no non-null value was produced.
//  *
//  * @sample samples.collections.Collections.Transformations.firstNotNullOf
//  */
// @SinceKotlin("1.5")
// @kotlin.internal.InlineOnly
// public inline fun <T, R : Any> Iterable<T>.firstNotNullOfOrNull(transform: (T) -> R?): R? {
//     for (element in this) {
//         val result = transform(element)
//         if (result != null) {
//             return result
//         }
//     }
//     return null
// }
//
// /**
//  * Returns the first element, or `null` if the collection is empty.
//  */
// public fun <T> Iterable<T>.firstOrNull(): T? {
//     when (this) {
//         is List -> {
//             if (isEmpty())
//                 return null
//             else
//                 return this[0]
//         }
//         else -> {
//             val iterator = iterator()
//             if (!iterator.hasNext())
//                 return null
//             return iterator.next()
//         }
//     }
// }
//
// /**
//  * Returns the first element, or `null` if the list is empty.
//  */
// public fun <T> List<T>.firstOrNull(): T? {
//     return if (isEmpty()) null else this[0]
// }
//
// /**
//  * Returns the first element matching the given [predicate], or `null` if element was not found.
//  */
// public inline fun <T> Iterable<T>.firstOrNull(predicate: (T) -> Boolean): T? {
//     for (element in this) if (predicate(element)) return element
//     return null
// }
//
// /**
//  * Returns an element at the given [index] or the result of calling the [defaultValue] function if the [index] is out of bounds of this list.
//  */
// @kotlin.internal.InlineOnly
// public inline fun <T> List<T>.getOrElse(index: Int, defaultValue: (Int) -> T): T {
//     return if (index >= 0 && index <= lastIndex) get(index) else defaultValue(index)
// }
//
// /**
//  * Returns an element at the given [index] or `null` if the [index] is out of bounds of this list.
//  *
//  * @sample samples.collections.Collections.Elements.getOrNull
//  */
// public fun <T> List<T>.getOrNull(index: Int): T? {
//     return if (index >= 0 && index <= lastIndex) get(index) else null
// }
//
// /**
//  * Returns first index of [element], or -1 if the collection does not contain element.
//  */
// public fun <@kotlin.internal.OnlyInputTypes T> Iterable<T>.indexOf(element: T): Int {
//     if (this is List) return this.indexOf(element)
//     var index = 0
//     for (item in this) {
//         checkIndexOverflow(index)
//         if (element == item)
//             return index
//         index++
//     }
//     return -1
// }
//
// /**
//  * Returns first index of [element], or -1 if the list does not contain element.
//  */
// @Suppress("EXTENSION_SHADOWED_BY_MEMBER") // false warning, extension takes precedence in some cases
// public fun <@kotlin.internal.OnlyInputTypes T> List<T>.indexOf(element: T): Int {
//     return indexOf(element)
// }
//
// /**
//  * Returns index of the first element matching the given [predicate], or -1 if the collection does not contain such element.
//  */
// public inline fun <T> Iterable<T>.indexOfFirst(predicate: (T) -> Boolean): Int {
//     var index = 0
//     for (item in this) {
//         checkIndexOverflow(index)
//         if (predicate(item))
//             return index
//         index++
//     }
//     return -1
// }
//
// /**
//  * Returns index of the first element matching the given [predicate], or -1 if the list does not contain such element.
//  */
// public inline fun <T> List<T>.indexOfFirst(predicate: (T) -> Boolean): Int {
//     var index = 0
//     for (item in this) {
//         if (predicate(item))
//             return index
//         index++
//     }
//     return -1
// }
//
// /**
//  * Returns index of the last element matching the given [predicate], or -1 if the collection does not contain such element.
//  */
// public inline fun <T> Iterable<T>.indexOfLast(predicate: (T) -> Boolean): Int {
//     var lastIndex = -1
//     var index = 0
//     for (item in this) {
//         checkIndexOverflow(index)
//         if (predicate(item))
//             lastIndex = index
//         index++
//     }
//     return lastIndex
// }
//
// /**
//  * Returns index of the last element matching the given [predicate], or -1 if the list does not contain such element.
//  */
// public inline fun <T> List<T>.indexOfLast(predicate: (T) -> Boolean): Int {
//     val iterator = this.listIterator(size)
//     while (iterator.hasPrevious()) {
//         if (predicate(iterator.previous())) {
//             return iterator.nextIndex()
//         }
//     }
//     return -1
// }
//
// /**
//  * Returns the last element.
//  *
//  * @throws NoSuchElementException if the collection is empty.
//  *
//  * @sample samples.collections.Collections.Elements.last
//  */
// public fun <T> Iterable<T>.last(): T {
//     when (this) {
//         is List -> return this.last()
//         else -> {
//             val iterator = iterator()
//             if (!iterator.hasNext())
//                 throw NoSuchElementException("Collection is empty.")
//             var last = iterator.next()
//             while (iterator.hasNext())
//                 last = iterator.next()
//             return last
//         }
//     }
// }
//
// /**
//  * Returns the last element.
//  *
//  * @throws NoSuchElementException if the list is empty.
//  *
//  * @sample samples.collections.Collections.Elements.last
//  */
// public fun <T> List<T>.last(): T {
//     if (isEmpty())
//         throw NoSuchElementException("List is empty.")
//     return this[lastIndex]
// }
//
// /**
//  * Returns the last element matching the given [predicate].
//  *
//  * @throws NoSuchElementException if no such element is found.
//  *
//  * @sample samples.collections.Collections.Elements.last
//  */
// public inline fun <T> Iterable<T>.last(predicate: (T) -> Boolean): T {
//     var last: T? = null
//     var found = false
//     for (element in this) {
//         if (predicate(element)) {
//             last = element
//             found = true
//         }
//     }
//     if (!found) throw NoSuchElementException("Collection contains no element matching the predicate.")
//     @Suppress("UNCHECKED_CAST")
//     return last as T
// }
//
// /**
//  * Returns the last element matching the given [predicate].
//  *
//  * @throws NoSuchElementException if no such element is found.
//  *
//  * @sample samples.collections.Collections.Elements.last
//  */
// public inline fun <T> List<T>.last(predicate: (T) -> Boolean): T {
//     val iterator = this.listIterator(size)
//     while (iterator.hasPrevious()) {
//         val element = iterator.previous()
//         if (predicate(element)) return element
//     }
//     throw NoSuchElementException("List contains no element matching the predicate.")
// }
//
// /**
//  * Returns last index of [element], or -1 if the collection does not contain element.
//  */
// public fun <@kotlin.internal.OnlyInputTypes T> Iterable<T>.lastIndexOf(element: T): Int {
//     if (this is List) return this.lastIndexOf(element)
//     var lastIndex = -1
//     var index = 0
//     for (item in this) {
//         checkIndexOverflow(index)
//         if (element == item)
//             lastIndex = index
//         index++
//     }
//     return lastIndex
// }
//
// /**
//  * Returns last index of [element], or -1 if the list does not contain element.
//  */
// @Suppress("EXTENSION_SHADOWED_BY_MEMBER") // false warning, extension takes precedence in some cases
// public fun <@kotlin.internal.OnlyInputTypes T> List<T>.lastIndexOf(element: T): Int {
//     return lastIndexOf(element)
// }
//
// /**
//  * Returns the last element, or `null` if the collection is empty.
//  *
//  * @sample samples.collections.Collections.Elements.last
//  */
// public fun <T> Iterable<T>.lastOrNull(): T? {
//     when (this) {
//         is List -> return if (isEmpty()) null else this[size - 1]
//         else -> {
//             val iterator = iterator()
//             if (!iterator.hasNext())
//                 return null
//             var last = iterator.next()
//             while (iterator.hasNext())
//                 last = iterator.next()
//             return last
//         }
//     }
// }
//
// /**
//  * Returns the last element, or `null` if the list is empty.
//  *
//  * @sample samples.collections.Collections.Elements.last
//  */
// public fun <T> List<T>.lastOrNull(): T? {
//     return if (isEmpty()) null else this[size - 1]
// }
//
// /**
//  * Returns the last element matching the given [predicate], or `null` if no such element was found.
//  *
//  * @sample samples.collections.Collections.Elements.last
//  */
// public inline fun <T> Iterable<T>.lastOrNull(predicate: (T) -> Boolean): T? {
//     var last: T? = null
//     for (element in this) {
//         if (predicate(element)) {
//             last = element
//         }
//     }
//     return last
// }
//
// /**
//  * Returns the last element matching the given [predicate], or `null` if no such element was found.
//  *
//  * @sample samples.collections.Collections.Elements.last
//  */
// public inline fun <T> List<T>.lastOrNull(predicate: (T) -> Boolean): T? {
//     val iterator = this.listIterator(size)
//     while (iterator.hasPrevious()) {
//         val element = iterator.previous()
//         if (predicate(element)) return element
//     }
//     return null
// }
//
// /**
//  * Returns a random element from this collection.
//  *
//  * @throws NoSuchElementException if this collection is empty.
//  */
// @SinceKotlin("1.3")
// @kotlin.internal.InlineOnly
// public inline fun <T> Collection<T>.random(): T {
//     return random(Random)
// }
//
// /**
//  * Returns a random element from this collection using the specified source of randomness.
//  *
//  * @throws NoSuchElementException if this collection is empty.
//  */
// @SinceKotlin("1.3")
// public fun <T> Collection<T>.random(random: Random): T {
//     if (isEmpty())
//         throw NoSuchElementException("Collection is empty.")
//     return elementAt(random.nextInt(size))
// }
//
// /**
//  * Returns a random element from this collection, or `null` if this collection is empty.
//  */
// @SinceKotlin("1.4")
// @WasExperimental(ExperimentalStdlibApi::class)
// @kotlin.internal.InlineOnly
// public inline fun <T> Collection<T>.randomOrNull(): T? {
//     return randomOrNull(Random)
// }
//
// /**
//  * Returns a random element from this collection using the specified source of randomness, or `null` if this collection is empty.
//  */
// @SinceKotlin("1.4")
// @WasExperimental(ExperimentalStdlibApi::class)
// public fun <T> Collection<T>.randomOrNull(random: Random): T? {
//     if (isEmpty())
//         return null
//     return elementAt(random.nextInt(size))
// }
//
// /**
//  * Returns the single element, or throws an exception if the collection is empty or has more than one element.
//  */
// public fun <T> Iterable<T>.single(): T {
//     when (this) {
//         is List -> return this.single()
//         else -> {
//             val iterator = iterator()
//             if (!iterator.hasNext())
//                 throw NoSuchElementException("Collection is empty.")
//             val single = iterator.next()
//             if (iterator.hasNext())
//                 throw IllegalArgumentException("Collection has more than one element.")
//             return single
//         }
//     }
// }
//
// /**
//  * Returns the single element, or throws an exception if the list is empty or has more than one element.
//  */
// public fun <T> List<T>.single(): T {
//     return when (size) {
//         0 -> throw NoSuchElementException("List is empty.")
//         1 -> this[0]
//         else -> throw IllegalArgumentException("List has more than one element.")
//     }
// }
//
// /**
//  * Returns the single element matching the given [predicate], or throws exception if there is no or more than one matching element.
//  */
// public inline fun <T> Iterable<T>.single(predicate: (T) -> Boolean): T {
//     var single: T? = null
//     var found = false
//     for (element in this) {
//         if (predicate(element)) {
//             if (found) throw IllegalArgumentException("Collection contains more than one matching element.")
//             single = element
//             found = true
//         }
//     }
//     if (!found) throw NoSuchElementException("Collection contains no element matching the predicate.")
//     @Suppress("UNCHECKED_CAST")
//     return single as T
// }
//
// /**
//  * Returns single element, or `null` if the collection is empty or has more than one element.
//  */
// public fun <T> Iterable<T>.singleOrNull(): T? {
//     when (this) {
//         is List -> return if (size == 1) this[0] else null
//         else -> {
//             val iterator = iterator()
//             if (!iterator.hasNext())
//                 return null
//             val single = iterator.next()
//             if (iterator.hasNext())
//                 return null
//             return single
//         }
//     }
// }
//
// /**
//  * Returns single element, or `null` if the list is empty or has more than one element.
//  */
// public fun <T> List<T>.singleOrNull(): T? {
//     return if (size == 1) this[0] else null
// }
//
// /**
//  * Returns the single element matching the given [predicate], or `null` if element was not found or more than one element was found.
//  */
// public inline fun <T> Iterable<T>.singleOrNull(predicate: (T) -> Boolean): T? {
//     var single: T? = null
//     var found = false
//     for (element in this) {
//         if (predicate(element)) {
//             if (found) return null
//             single = element
//             found = true
//         }
//     }
//     if (!found) return null
//     return single
// }
//
// /**
//  * Returns a list containing all elements except first [n] elements.
//  *
//  * @throws IllegalArgumentException if [n] is negative.
//  *
//  * @sample samples.collections.Collections.Transformations.drop
//  */
// public fun <T> Iterable<T>.drop(n: Int): List<T> {
//     require(n >= 0) { "Requested element count $n is less than zero." }
//     if (n == 0) return toList()
//     val list: ArrayList<T>
//     if (this is Collection<*>) {
//         val resultSize = size - n
//         if (resultSize <= 0)
//             return emptyList()
//         if (resultSize == 1)
//             return listOf(last())
//         list = ArrayList<T>(resultSize)
//         if (this is List<T>) {
//             if (this is RandomAccess) {
//                 for (index in n until size)
//                     list.add(this[index])
//             } else {
//                 for (item in listIterator(n))
//                     list.add(item)
//             }
//             return list
//         }
//     }
//     else {
//         list = ArrayList<T>()
//     }
//     var count = 0
//     for (item in this) {
//         if (count >= n) list.add(item) else ++count
//     }
//     return list.optimizeReadOnlyList()
// }
//
// /**
//  * Returns a list containing all elements except last [n] elements.
//  *
//  * @throws IllegalArgumentException if [n] is negative.
//  *
//  * @sample samples.collections.Collections.Transformations.drop
//  */
// public fun <T> List<T>.dropLast(n: Int): List<T> {
//     require(n >= 0) { "Requested element count $n is less than zero." }
//     return take((size - n).coerceAtLeast(0))
// }
//
// /**
//  * Returns a list containing all elements except last elements that satisfy the given [predicate].
//  *
//  * @sample samples.collections.Collections.Transformations.drop
//  */
// public inline fun <T> List<T>.dropLastWhile(predicate: (T) -> Boolean): List<T> {
//     if (!isEmpty()) {
//         val iterator = listIterator(size)
//         while (iterator.hasPrevious()) {
//             if (!predicate(iterator.previous())) {
//                 return take(iterator.nextIndex() + 1)
//             }
//         }
//     }
//     return emptyList()
// }
//
// /**
//  * Returns a list containing all elements except first elements that satisfy the given [predicate].
//  *
//  * @sample samples.collections.Collections.Transformations.drop
//  */
// public inline fun <T> Iterable<T>.dropWhile(predicate: (T) -> Boolean): List<T> {
//     var yielding = false
//     val list = ArrayList<T>()
//     for (item in this)
//         if (yielding)
//             list.add(item)
//         else if (!predicate(item)) {
//             list.add(item)
//             yielding = true
//         }
//     return list
// }
//
// /**
//  * Returns a list containing only elements matching the given [predicate].
//  *
//  * @sample samples.collections.Collections.Filtering.filter
//  */
// public inline fun <T> Iterable<T>.filter(predicate: (T) -> Boolean): List<T> {
//     return filterTo(ArrayList<T>(), predicate)
// }
//
// /**
//  * Returns a list containing only elements matching the given [predicate].
//  * @param [predicate] function that takes the index of an element and the element itself
//  * and returns the result of predicate evaluation on the element.
//  *
//  * @sample samples.collections.Collections.Filtering.filterIndexed
//  */
// public inline fun <T> Iterable<T>.filterIndexed(predicate: (index: Int, T) -> Boolean): List<T> {
//     return filterIndexedTo(ArrayList<T>(), predicate)
// }
//
// /**
//  * Appends all elements matching the given [predicate] to the given [destination].
//  * @param [predicate] function that takes the index of an element and the element itself
//  * and returns the result of predicate evaluation on the element.
//  *
//  * @sample samples.collections.Collections.Filtering.filterIndexedTo
//  */
// public inline fun <T, C : MutableCollection<in T>> Iterable<T>.filterIndexedTo(destination: C, predicate: (index: Int, T) -> Boolean): C {
//     forEachIndexed { index, element ->
//         if (predicate(index, element)) destination.add(element)
//     }
//     return destination
// }
//
// /**
//  * Returns a list containing all elements that are instances of specified type parameter R.
//  *
//  * @sample samples.collections.Collections.Filtering.filterIsInstance
//  */
// public inline fun <reified R> Iterable<*>.filterIsInstance(): List<@kotlin.internal.NoInfer R> {
//     return filterIsInstanceTo(ArrayList<R>())
// }
//
// /**
//  * Appends all elements that are instances of specified type parameter R to the given [destination].
//  *
//  * @sample samples.collections.Collections.Filtering.filterIsInstanceTo
//  */
// public inline fun <reified R, C : MutableCollection<in R>> Iterable<*>.filterIsInstanceTo(destination: C): C {
//     for (element in this) if (element is R) destination.add(element)
//     return destination
// }
//
// /**
//  * Returns a list containing all elements not matching the given [predicate].
//  *
//  * @sample samples.collections.Collections.Filtering.filter
//  */
// public inline fun <T> Iterable<T>.filterNot(predicate: (T) -> Boolean): List<T> {
//     return filterNotTo(ArrayList<T>(), predicate)
// }
//
// /**
//  * Returns a list containing all elements that are not `null`.
//  *
//  * @sample samples.collections.Collections.Filtering.filterNotNull
//  */
// public fun <T : Any> Iterable<T?>.filterNotNull(): List<T> {
//     return filterNotNullTo(ArrayList<T>())
// }
//
// /**
//  * Appends all elements that are not `null` to the given [destination].
//  *
//  * @sample samples.collections.Collections.Filtering.filterNotNullTo
//  */
// public fun <C : MutableCollection<in T>, T : Any> Iterable<T?>.filterNotNullTo(destination: C): C {
//     for (element in this) if (element != null) destination.add(element)
//     return destination
// }
//
// /**
//  * Appends all elements not matching the given [predicate] to the given [destination].
//  *
//  * @sample samples.collections.Collections.Filtering.filterTo
//  */
// public inline fun <T, C : MutableCollection<in T>> Iterable<T>.filterNotTo(destination: C, predicate: (T) -> Boolean): C {
//     for (element in this) if (!predicate(element)) destination.add(element)
//     return destination
// }
//
// /**
//  * Appends all elements matching the given [predicate] to the given [destination].
//  *
//  * @sample samples.collections.Collections.Filtering.filterTo
//  */
// public inline fun <T, C : MutableCollection<in T>> Iterable<T>.filterTo(destination: C, predicate: (T) -> Boolean): C {
//     for (element in this) if (predicate(element)) destination.add(element)
//     return destination
// }
//
// /**
//  * Returns a list containing elements at indices in the specified [indices] range.
//  */
// public fun <T> List<T>.slice(indices: IntRange): List<T> {
//     if (indices.isEmpty()) return listOf()
//     return this.subList(indices.start, indices.endInclusive + 1).toList()
// }
//
// /**
//  * Returns a list containing elements at specified [indices].
//  */
// public fun <T> List<T>.slice(indices: Iterable<Int>): List<T> {
//     val size = indices.collectionSizeOrDefault(10)
//     if (size == 0) return emptyList()
//     val list = ArrayList<T>(size)
//     for (index in indices) {
//         list.add(get(index))
//     }
//     return list
// }
//
// /**
//  * Returns a list containing first [n] elements.
//  *
//  * @throws IllegalArgumentException if [n] is negative.
//  *
//  * @sample samples.collections.Collections.Transformations.take
//  */
// public fun <T> Iterable<T>.take(n: Int): List<T> {
//     require(n >= 0) { "Requested element count $n is less than zero." }
//     if (n == 0) return emptyList()
//     if (this is Collection<T>) {
//         if (n >= size) return toList()
//         if (n == 1) return listOf(first())
//     }
//     var count = 0
//     val list = ArrayList<T>(n)
//     for (item in this) {
//         list.add(item)
//         if (++count == n)
//             break
//     }
//     return list.optimizeReadOnlyList()
// }
//
// /**
//  * Returns a list containing last [n] elements.
//  *
//  * @throws IllegalArgumentException if [n] is negative.
//  *
//  * @sample samples.collections.Collections.Transformations.take
//  */
// public fun <T> List<T>.takeLast(n: Int): List<T> {
//     require(n >= 0) { "Requested element count $n is less than zero." }
//     if (n == 0) return emptyList()
//     val size = size
//     if (n >= size) return toList()
//     if (n == 1) return listOf(last())
//     val list = ArrayList<T>(n)
//     if (this is RandomAccess) {
//         for (index in size - n until size)
//             list.add(this[index])
//     } else {
//         for (item in listIterator(size - n))
//             list.add(item)
//     }
//     return list
// }
//
// /**
//  * Returns a list containing last elements satisfying the given [predicate].
//  *
//  * @sample samples.collections.Collections.Transformations.take
//  */
// public inline fun <T> List<T>.takeLastWhile(predicate: (T) -> Boolean): List<T> {
//     if (isEmpty())
//         return emptyList()
//     val iterator = listIterator(size)
//     while (iterator.hasPrevious()) {
//         if (!predicate(iterator.previous())) {
//             iterator.next()
//             val expectedSize = size - iterator.nextIndex()
//             if (expectedSize == 0) return emptyList()
//             return ArrayList<T>(expectedSize).apply {
//                 while (iterator.hasNext())
//                     add(iterator.next())
//             }
//         }
//     }
//     return toList()
// }
//
// /**
//  * Returns a list containing first elements satisfying the given [predicate].
//  *
//  * @sample samples.collections.Collections.Transformations.take
//  */
// public inline fun <T> Iterable<T>.takeWhile(predicate: (T) -> Boolean): List<T> {
//     val list = ArrayList<T>()
//     for (item in this) {
//         if (!predicate(item))
//             break
//         list.add(item)
//     }
//     return list
// }
//
// /**
//  * Reverses elements in the list in-place.
//  */
// public expect fun <T> MutableList<T>.reverse(): Unit
//
// /**
//  * Returns a list with elements in reversed order.
//  */
// public fun <T> Iterable<T>.reversed(): List<T> {
//     if (this is Collection && size <= 1) return toList()
//     val list = toMutableList()
//     list.reverse()
//     return list
// }
//
// /**
//  * Randomly shuffles elements in this list in-place using the specified [random] instance as the source of randomness.
//  *
//  * See: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
//  */
// @SinceKotlin("1.3")
// public fun <T> MutableList<T>.shuffle(random: Random): Unit {
//     for (i in lastIndex downTo 1) {
//         val j = random.nextInt(i + 1)
//         this[j] = this.set(i, this[j])
//     }
// }
//
// /**
//  * Sorts elements in the list in-place according to natural sort order of the value returned by specified [selector] function.
//  *
//  * The sort is _stable_. It means that equal elements preserve their order relative to each other after sorting.
//  */
// public inline fun <T, R : Comparable<R>> MutableList<T>.sortBy(crossinline selector: (T) -> R?): Unit {
//     if (size > 1) sortWith(compareBy(selector))
// }
//
// /**
//  * Sorts elements in the list in-place descending according to natural sort order of the value returned by specified [selector] function.
//  *
//  * The sort is _stable_. It means that equal elements preserve their order relative to each other after sorting.
//  */
// public inline fun <T, R : Comparable<R>> MutableList<T>.sortByDescending(crossinline selector: (T) -> R?): Unit {
//     if (size > 1) sortWith(compareByDescending(selector))
// }
//
// /**
//  * Sorts elements in the list in-place descending according to their natural sort order.
//  *
//  * The sort is _stable_. It means that equal elements preserve their order relative to each other after sorting.
//  */
// public fun <T : Comparable<T>> MutableList<T>.sortDescending(): Unit {
//     sortWith(reverseOrder())
// }
//
// /**
//  * Returns a list of all elements sorted according to their natural sort order.
//  *
//  * The sort is _stable_. It means that equal elements preserve their order relative to each other after sorting.
//  */
// public fun <T : Comparable<T>> Iterable<T>.sorted(): List<T> {
//     if (this is Collection) {
//         if (size <= 1) return this.toList()
//         @Suppress("UNCHECKED_CAST")
//         return (toTypedArray<Comparable<T>>() as Array<T>).apply { sort() }.asList()
//     }
//     return toMutableList().apply { sort() }
// }
//
// /**
//  * Returns a list of all elements sorted according to natural sort order of the value returned by specified [selector] function.
//  *
//  * The sort is _stable_. It means that equal elements preserve their order relative to each other after sorting.
//  *
//  * @sample samples.collections.Collections.Sorting.sortedBy
//  */
// public inline fun <T, R : Comparable<R>> Iterable<T>.sortedBy(crossinline selector: (T) -> R?): List<T> {
//     return sortedWith(compareBy(selector))
// }
//
// /**
//  * Returns a list of all elements sorted descending according to natural sort order of the value returned by specified [selector] function.
//  *
//  * The sort is _stable_. It means that equal elements preserve their order relative to each other after sorting.
//  */
// public inline fun <T, R : Comparable<R>> Iterable<T>.sortedByDescending(crossinline selector: (T) -> R?): List<T> {
//     return sortedWith(compareByDescending(selector))
// }
//
// /**
//  * Returns a list of all elements sorted descending according to their natural sort order.
//  *
//  * The sort is _stable_. It means that equal elements preserve their order relative to each other after sorting.
//  */
// public fun <T : Comparable<T>> Iterable<T>.sortedDescending(): List<T> {
//     return sortedWith(reverseOrder())
// }
//
// /**
//  * Returns a list of all elements sorted according to the specified [comparator].
//  *
//  * The sort is _stable_. It means that equal elements preserve their order relative to each other after sorting.
//  */
// public fun <T> Iterable<T>.sortedWith(comparator: Comparator<in T>): List<T> {
//     if (this is Collection) {
//        if (size <= 1) return this.toList()
//        @Suppress("UNCHECKED_CAST")
//        return (toTypedArray<Any?>() as Array<T>).apply { sortWith(comparator) }.asList()
//     }
//     return toMutableList().apply { sortWith(comparator) }
// }
//
// /**
//  * Returns an array of Boolean containing all of the elements of this collection.
//  */
// public fun Collection<Boolean>.toBooleanArray(): BooleanArray {
//     val result = BooleanArray(size)
//     var index = 0
//     for (element in this)
//         result[index++] = element
//     return result
// }
//
// /**
//  * Returns an array of Byte containing all of the elements of this collection.
//  */
// public fun Collection<Byte>.toByteArray(): ByteArray {
//     val result = ByteArray(size)
//     var index = 0
//     for (element in this)
//         result[index++] = element
//     return result
// }
//
// /**
//  * Returns an array of Char containing all of the elements of this collection.
//  */
// public fun Collection<Char>.toCharArray(): CharArray {
//     val result = CharArray(size)
//     var index = 0
//     for (element in this)
//         result[index++] = element
//     return result
// }
//
// /**
//  * Returns an array of Double containing all of the elements of this collection.
//  */
// public fun Collection<Double>.toDoubleArray(): DoubleArray {
//     val result = DoubleArray(size)
//     var index = 0
//     for (element in this)
//         result[index++] = element
//     return result
// }
//
// /**
//  * Returns an array of Float containing all of the elements of this collection.
//  */
// public fun Collection<Float>.toFloatArray(): FloatArray {
//     val result = FloatArray(size)
//     var index = 0
//     for (element in this)
//         result[index++] = element
//     return result
// }
//
// /**
//  * Returns an array of Int containing all of the elements of this collection.
//  */
// public fun Collection<Int>.toIntArray(): IntArray {
//     val result = IntArray(size)
//     var index = 0
//     for (element in this)
//         result[index++] = element
//     return result
// }
//
// /**
//  * Returns an array of Long containing all of the elements of this collection.
//  */
// public fun Collection<Long>.toLongArray(): LongArray {
//     val result = LongArray(size)
//     var index = 0
//     for (element in this)
//         result[index++] = element
//     return result
// }
//
// /**
//  * Returns an array of Short containing all of the elements of this collection.
//  */
// public fun Collection<Short>.toShortArray(): ShortArray {
//     val result = ShortArray(size)
//     var index = 0
//     for (element in this)
//         result[index++] = element
//     return result
// }
//
// /**
//  * Returns a [Map] containing key-value pairs provided by [transform] function
//  * applied to elements of the given collection.
//  *
//  * If any of two pairs would have the same key the last one gets added to the map.
//  *
//  * The returned map preserves the entry iteration order of the original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.associate
//  */
// public inline fun <T, K, V> Iterable<T>.associate(transform: (T) -> Pair<K, V>): Map<K, V> {
//     val capacity = mapCapacity(collectionSizeOrDefault(10)).coerceAtLeast(16)
//     return associateTo(LinkedHashMap<K, V>(capacity), transform)
// }
//
// /**
//  * Returns a [Map] containing the elements from the given collection indexed by the key
//  * returned from [keySelector] function applied to each element.
//  *
//  * If any two elements would have the same key returned by [keySelector] the last one gets added to the map.
//  *
//  * The returned map preserves the entry iteration order of the original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.associateBy
//  */
// public inline fun <T, K> Iterable<T>.associateBy(keySelector: (T) -> K): Map<K, T> {
//     val capacity = mapCapacity(collectionSizeOrDefault(10)).coerceAtLeast(16)
//     return associateByTo(LinkedHashMap<K, T>(capacity), keySelector)
// }
//
// /**
//  * Returns a [Map] containing the values provided by [valueTransform] and indexed by [keySelector] functions applied to elements of the given collection.
//  *
//  * If any two elements would have the same key returned by [keySelector] the last one gets added to the map.
//  *
//  * The returned map preserves the entry iteration order of the original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.associateByWithValueTransform
//  */
// public inline fun <T, K, V> Iterable<T>.associateBy(keySelector: (T) -> K, valueTransform: (T) -> V): Map<K, V> {
//     val capacity = mapCapacity(collectionSizeOrDefault(10)).coerceAtLeast(16)
//     return associateByTo(LinkedHashMap<K, V>(capacity), keySelector, valueTransform)
// }
//
// /**
//  * Populates and returns the [destination] mutable map with key-value pairs,
//  * where key is provided by the [keySelector] function applied to each element of the given collection
//  * and value is the element itself.
//  *
//  * If any two elements would have the same key returned by [keySelector] the last one gets added to the map.
//  *
//  * @sample samples.collections.Collections.Transformations.associateByTo
//  */
// public inline fun <T, K, M : MutableMap<in K, in T>> Iterable<T>.associateByTo(destination: M, keySelector: (T) -> K): M {
//     for (element in this) {
//         destination.put(keySelector(element), element)
//     }
//     return destination
// }
//
// /**
//  * Populates and returns the [destination] mutable map with key-value pairs,
//  * where key is provided by the [keySelector] function and
//  * and value is provided by the [valueTransform] function applied to elements of the given collection.
//  *
//  * If any two elements would have the same key returned by [keySelector] the last one gets added to the map.
//  *
//  * @sample samples.collections.Collections.Transformations.associateByToWithValueTransform
//  */
// public inline fun <T, K, V, M : MutableMap<in K, in V>> Iterable<T>.associateByTo(destination: M, keySelector: (T) -> K, valueTransform: (T) -> V): M {
//     for (element in this) {
//         destination.put(keySelector(element), valueTransform(element))
//     }
//     return destination
// }
//
// /**
//  * Populates and returns the [destination] mutable map with key-value pairs
//  * provided by [transform] function applied to each element of the given collection.
//  *
//  * If any of two pairs would have the same key the last one gets added to the map.
//  *
//  * @sample samples.collections.Collections.Transformations.associateTo
//  */
// public inline fun <T, K, V, M : MutableMap<in K, in V>> Iterable<T>.associateTo(destination: M, transform: (T) -> Pair<K, V>): M {
//     for (element in this) {
//         destination += transform(element)
//     }
//     return destination
// }
//
// /**
//  * Returns a [Map] where keys are elements from the given collection and values are
//  * produced by the [valueSelector] function applied to each element.
//  *
//  * If any two elements are equal, the last one gets added to the map.
//  *
//  * The returned map preserves the entry iteration order of the original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.associateWith
//  */
// @SinceKotlin("1.3")
// public inline fun <K, V> Iterable<K>.associateWith(valueSelector: (K) -> V): Map<K, V> {
//     val result = LinkedHashMap<K, V>(mapCapacity(collectionSizeOrDefault(10)).coerceAtLeast(16))
//     return associateWithTo(result, valueSelector)
// }
//
// /**
//  * Populates and returns the [destination] mutable map with key-value pairs for each element of the given collection,
//  * where key is the element itself and value is provided by the [valueSelector] function applied to that key.
//  *
//  * If any two elements are equal, the last one overwrites the former value in the map.
//  *
//  * @sample samples.collections.Collections.Transformations.associateWithTo
//  */
// @SinceKotlin("1.3")
// public inline fun <K, V, M : MutableMap<in K, in V>> Iterable<K>.associateWithTo(destination: M, valueSelector: (K) -> V): M {
//     for (element in this) {
//         destination.put(element, valueSelector(element))
//     }
//     return destination
// }
//
// /**
//  * Appends all elements to the given [destination] collection.
//  */
// public fun <T, C : MutableCollection<in T>> Iterable<T>.toCollection(destination: C): C {
//     for (item in this) {
//         destination.add(item)
//     }
//     return destination
// }
//
// /**
//  * Returns a new [HashSet] of all elements.
//  */
// public fun <T> Iterable<T>.toHashSet(): HashSet<T> {
//     return toCollection(HashSet<T>(mapCapacity(collectionSizeOrDefault(12))))
// }
//
// /**
//  * Returns a [List] containing all elements.
//  */
// public fun <T> Iterable<T>.toList(): List<T> {
//     if (this is Collection) {
//         return when (size) {
//             0 -> emptyList()
//             1 -> listOf(if (this is List) get(0) else iterator().next())
//             else -> this.toMutableList()
//         }
//     }
//     return this.toMutableList().optimizeReadOnlyList()
// }
//
// /**
//  * Returns a new [MutableList] filled with all elements of this collection.
//  */
// public fun <T> Iterable<T>.toMutableList(): MutableList<T> {
//     if (this is Collection<T>)
//         return this.toMutableList()
//     return toCollection(ArrayList<T>())
// }
//
// /**
//  * Returns a new [MutableList] filled with all elements of this collection.
//  */
// public fun <T> Collection<T>.toMutableList(): MutableList<T> {
//     return ArrayList(this)
// }
//
// /**
//  * Returns a [Set] of all elements.
//  *
//  * The returned set preserves the element iteration order of the original collection.
//  */
// public fun <T> Iterable<T>.toSet(): Set<T> {
//     if (this is Collection) {
//         return when (size) {
//             0 -> emptySet()
//             1 -> setOf(if (this is List) this[0] else iterator().next())
//             else -> toCollection(LinkedHashSet<T>(mapCapacity(size)))
//         }
//     }
//     return toCollection(LinkedHashSet<T>()).optimizeReadOnlySet()
// }
//
// /**
//  * Returns a single list of all elements yielded from results of [transform] function being invoked on each element of original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.flatMap
//  */
// public inline fun <T, R> Iterable<T>.flatMap(transform: (T) -> Iterable<R>): List<R> {
//     return flatMapTo(ArrayList<R>(), transform)
// }
//
// /**
//  * Returns a single list of all elements yielded from results of [transform] function being invoked on each element of original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.flatMap
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.jvm.JvmName("flatMapSequence")
// public inline fun <T, R> Iterable<T>.flatMap(transform: (T) -> Sequence<R>): List<R> {
//     return flatMapTo(ArrayList<R>(), transform)
// }
//
// /**
//  * Returns a single list of all elements yielded from results of [transform] function being invoked on each element
//  * and its index in the original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.flatMapIndexed
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.jvm.JvmName("flatMapIndexedIterable")
// @kotlin.internal.InlineOnly
// public inline fun <T, R> Iterable<T>.flatMapIndexed(transform: (index: Int, T) -> Iterable<R>): List<R> {
//     return flatMapIndexedTo(ArrayList<R>(), transform)
// }
//
// /**
//  * Returns a single list of all elements yielded from results of [transform] function being invoked on each element
//  * and its index in the original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.flatMapIndexed
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.jvm.JvmName("flatMapIndexedSequence")
// @kotlin.internal.InlineOnly
// public inline fun <T, R> Iterable<T>.flatMapIndexed(transform: (index: Int, T) -> Sequence<R>): List<R> {
//     return flatMapIndexedTo(ArrayList<R>(), transform)
// }
//
// /**
//  * Appends all elements yielded from results of [transform] function being invoked on each element
//  * and its index in the original collection, to the given [destination].
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.jvm.JvmName("flatMapIndexedIterableTo")
// @kotlin.internal.InlineOnly
// public inline fun <T, R, C : MutableCollection<in R>> Iterable<T>.flatMapIndexedTo(destination: C, transform: (index: Int, T) -> Iterable<R>): C {
//     var index = 0
//     for (element in this) {
//         val list = transform(checkIndexOverflow(index++), element)
//         destination.addAll(list)
//     }
//     return destination
// }
//
// /**
//  * Appends all elements yielded from results of [transform] function being invoked on each element
//  * and its index in the original collection, to the given [destination].
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.jvm.JvmName("flatMapIndexedSequenceTo")
// @kotlin.internal.InlineOnly
// public inline fun <T, R, C : MutableCollection<in R>> Iterable<T>.flatMapIndexedTo(destination: C, transform: (index: Int, T) -> Sequence<R>): C {
//     var index = 0
//     for (element in this) {
//         val list = transform(checkIndexOverflow(index++), element)
//         destination.addAll(list)
//     }
//     return destination
// }
//
// /**
//  * Appends all elements yielded from results of [transform] function being invoked on each element of original collection, to the given [destination].
//  */
// public inline fun <T, R, C : MutableCollection<in R>> Iterable<T>.flatMapTo(destination: C, transform: (T) -> Iterable<R>): C {
//     for (element in this) {
//         val list = transform(element)
//         destination.addAll(list)
//     }
//     return destination
// }
//
// /**
//  * Appends all elements yielded from results of [transform] function being invoked on each element of original collection, to the given [destination].
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.jvm.JvmName("flatMapSequenceTo")
// public inline fun <T, R, C : MutableCollection<in R>> Iterable<T>.flatMapTo(destination: C, transform: (T) -> Sequence<R>): C {
//     for (element in this) {
//         val list = transform(element)
//         destination.addAll(list)
//     }
//     return destination
// }
//
// /**
//  * Groups elements of the original collection by the key returned by the given [keySelector] function
//  * applied to each element and returns a map where each group key is associated with a list of corresponding elements.
//  *
//  * The returned map preserves the entry iteration order of the keys produced from the original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.groupBy
//  */
// public inline fun <T, K> Iterable<T>.groupBy(keySelector: (T) -> K): Map<K, List<T>> {
//     return groupByTo(LinkedHashMap<K, MutableList<T>>(), keySelector)
// }
//
// /**
//  * Groups values returned by the [valueTransform] function applied to each element of the original collection
//  * by the key returned by the given [keySelector] function applied to the element
//  * and returns a map where each group key is associated with a list of corresponding values.
//  *
//  * The returned map preserves the entry iteration order of the keys produced from the original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.groupByKeysAndValues
//  */
// public inline fun <T, K, V> Iterable<T>.groupBy(keySelector: (T) -> K, valueTransform: (T) -> V): Map<K, List<V>> {
//     return groupByTo(LinkedHashMap<K, MutableList<V>>(), keySelector, valueTransform)
// }
//
// /**
//  * Groups elements of the original collection by the key returned by the given [keySelector] function
//  * applied to each element and puts to the [destination] map each group key associated with a list of corresponding elements.
//  *
//  * @return The [destination] map.
//  *
//  * @sample samples.collections.Collections.Transformations.groupBy
//  */
// public inline fun <T, K, M : MutableMap<in K, MutableList<T>>> Iterable<T>.groupByTo(destination: M, keySelector: (T) -> K): M {
//     for (element in this) {
//         val key = keySelector(element)
//         val list = destination.getOrPut(key) { ArrayList<T>() }
//         list.add(element)
//     }
//     return destination
// }
//
// /**
//  * Groups values returned by the [valueTransform] function applied to each element of the original collection
//  * by the key returned by the given [keySelector] function applied to the element
//  * and puts to the [destination] map each group key associated with a list of corresponding values.
//  *
//  * @return The [destination] map.
//  *
//  * @sample samples.collections.Collections.Transformations.groupByKeysAndValues
//  */
// public inline fun <T, K, V, M : MutableMap<in K, MutableList<V>>> Iterable<T>.groupByTo(destination: M, keySelector: (T) -> K, valueTransform: (T) -> V): M {
//     for (element in this) {
//         val key = keySelector(element)
//         val list = destination.getOrPut(key) { ArrayList<V>() }
//         list.add(valueTransform(element))
//     }
//     return destination
// }
//
// /**
//  * Creates a [Grouping] source from a collection to be used later with one of group-and-fold operations
//  * using the specified [keySelector] function to extract a key from each element.
//  *
//  * @sample samples.collections.Grouping.groupingByEachCount
//  */
// @SinceKotlin("1.1")
// public inline fun <T, K> Iterable<T>.groupingBy(crossinline keySelector: (T) -> K): Grouping<T, K> {
//     return object : Grouping<T, K> {
//         override fun sourceIterator(): Iterator<T> = this@groupingBy.iterator()
//         override fun keyOf(element: T): K = keySelector(element)
//     }
// }
//
// /**
//  * Returns a list containing the results of applying the given [transform] function
//  * to each element in the original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.map
//  */
// public inline fun <T, R> Iterable<T>.map(transform: (T) -> R): List<R> {
//     return mapTo(ArrayList<R>(collectionSizeOrDefault(10)), transform)
// }
//
// /**
//  * Returns a list containing the results of applying the given [transform] function
//  * to each element and its index in the original collection.
//  * @param [transform] function that takes the index of an element and the element itself
//  * and returns the result of the transform applied to the element.
//  */
// public inline fun <T, R> Iterable<T>.mapIndexed(transform: (index: Int, T) -> R): List<R> {
//     return mapIndexedTo(ArrayList<R>(collectionSizeOrDefault(10)), transform)
// }
//
// /**
//  * Returns a list containing only the non-null results of applying the given [transform] function
//  * to each element and its index in the original collection.
//  * @param [transform] function that takes the index of an element and the element itself
//  * and returns the result of the transform applied to the element.
//  */
// public inline fun <T, R : Any> Iterable<T>.mapIndexedNotNull(transform: (index: Int, T) -> R?): List<R> {
//     return mapIndexedNotNullTo(ArrayList<R>(), transform)
// }
//
// /**
//  * Applies the given [transform] function to each element and its index in the original collection
//  * and appends only the non-null results to the given [destination].
//  * @param [transform] function that takes the index of an element and the element itself
//  * and returns the result of the transform applied to the element.
//  */
// public inline fun <T, R : Any, C : MutableCollection<in R>> Iterable<T>.mapIndexedNotNullTo(destination: C, transform: (index: Int, T) -> R?): C {
//     forEachIndexed { index, element -> transform(index, element)?.let { destination.add(it) } }
//     return destination
// }
//
// /**
//  * Applies the given [transform] function to each element and its index in the original collection
//  * and appends the results to the given [destination].
//  * @param [transform] function that takes the index of an element and the element itself
//  * and returns the result of the transform applied to the element.
//  */
// public inline fun <T, R, C : MutableCollection<in R>> Iterable<T>.mapIndexedTo(destination: C, transform: (index: Int, T) -> R): C {
//     var index = 0
//     for (item in this)
//         destination.add(transform(checkIndexOverflow(index++), item))
//     return destination
// }
//
// /**
//  * Returns a list containing only the non-null results of applying the given [transform] function
//  * to each element in the original collection.
//  *
//  * @sample samples.collections.Collections.Transformations.mapNotNull
//  */
// public inline fun <T, R : Any> Iterable<T>.mapNotNull(transform: (T) -> R?): List<R> {
//     return mapNotNullTo(ArrayList<R>(), transform)
// }
//
// /**
//  * Applies the given [transform] function to each element in the original collection
//  * and appends only the non-null results to the given [destination].
//  */
// public inline fun <T, R : Any, C : MutableCollection<in R>> Iterable<T>.mapNotNullTo(destination: C, transform: (T) -> R?): C {
//     forEach { element -> transform(element)?.let { destination.add(it) } }
//     return destination
// }
//
// /**
//  * Applies the given [transform] function to each element of the original collection
//  * and appends the results to the given [destination].
//  */
// public inline fun <T, R, C : MutableCollection<in R>> Iterable<T>.mapTo(destination: C, transform: (T) -> R): C {
//     for (item in this)
//         destination.add(transform(item))
//     return destination
// }
//
// /**
//  * Returns a lazy [Iterable] that wraps each element of the original collection
//  * into an [IndexedValue] containing the index of that element and the element itself.
//  */
// public fun <T> Iterable<T>.withIndex(): Iterable<IndexedValue<T>> {
//     return IndexingIterable { iterator() }
// }
//
// /**
//  * Returns a list containing only distinct elements from the given collection.
//  *
//  * Among equal elements of the given collection, only the first one will be present in the resulting list.
//  * The elements in the resulting list are in the same order as they were in the source collection.
//  *
//  * @sample samples.collections.Collections.Transformations.distinctAndDistinctBy
//  */
// public fun <T> Iterable<T>.distinct(): List<T> {
//     return this.toMutableSet().toList()
// }
//
// /**
//  * Returns a list containing only elements from the given collection
//  * having distinct keys returned by the given [selector] function.
//  *
//  * Among elements of the given collection with equal keys, only the first one will be present in the resulting list.
//  * The elements in the resulting list are in the same order as they were in the source collection.
//  *
//  * @sample samples.collections.Collections.Transformations.distinctAndDistinctBy
//  */
// public inline fun <T, K> Iterable<T>.distinctBy(selector: (T) -> K): List<T> {
//     val set = HashSet<K>()
//     val list = ArrayList<T>()
//     for (e in this) {
//         val key = selector(e)
//         if (set.add(key))
//             list.add(e)
//     }
//     return list
// }
//
// /**
//  * Returns a set containing all elements that are contained by both this collection and the specified collection.
//  *
//  * The returned set preserves the element iteration order of the original collection.
//  *
//  * To get a set containing all elements that are contained at least in one of these collections use [union].
//  */
// public infix fun <T> Iterable<T>.intersect(other: Iterable<T>): Set<T> {
//     val set = this.toMutableSet()
//     set.retainAll(other)
//     return set
// }
//
// /**
//  * Returns a set containing all elements that are contained by this collection and not contained by the specified collection.
//  *
//  * The returned set preserves the element iteration order of the original collection.
//  */
// public infix fun <T> Iterable<T>.subtract(other: Iterable<T>): Set<T> {
//     val set = this.toMutableSet()
//     set.removeAll(other)
//     return set
// }
//
// /**
//  * Returns a new [MutableSet] containing all distinct elements from the given collection.
//  *
//  * The returned set preserves the element iteration order of the original collection.
//  */
// public fun <T> Iterable<T>.toMutableSet(): MutableSet<T> {
//     return when (this) {
//         is Collection<T> -> LinkedHashSet(this)
//         else -> toCollection(LinkedHashSet<T>())
//     }
// }
//
// /**
//  * Returns a set containing all distinct elements from both collections.
//  *
//  * The returned set preserves the element iteration order of the original collection.
//  * Those elements of the [other] collection that are unique are iterated in the end
//  * in the order of the [other] collection.
//  *
//  * To get a set containing all elements that are contained in both collections use [intersect].
//  */
// public infix fun <T> Iterable<T>.union(other: Iterable<T>): Set<T> {
//     val set = this.toMutableSet()
//     set.addAll(other)
//     return set
// }
//
// /**
//  * Returns `true` if all elements match the given [predicate].
//  *
//  * @sample samples.collections.Collections.Aggregates.all
//  */
// public inline fun <T> Iterable<T>.all(predicate: (T) -> Boolean): Boolean {
//     if (this is Collection && isEmpty()) return true
//     for (element in this) if (!predicate(element)) return false
//     return true
// }
//
// /**
//  * Returns `true` if collection has at least one element.
//  *
//  * @sample samples.collections.Collections.Aggregates.any
//  */
// public fun <T> Iterable<T>.any(): Boolean {
//     if (this is Collection) return !isEmpty()
//     return iterator().hasNext()
// }
//
// /**
//  * Returns `true` if at least one element matches the given [predicate].
//  *
//  * @sample samples.collections.Collections.Aggregates.anyWithPredicate
//  */
// public inline fun <T> Iterable<T>.any(predicate: (T) -> Boolean): Boolean {
//     if (this is Collection && isEmpty()) return false
//     for (element in this) if (predicate(element)) return true
//     return false
// }
//
// /**
//  * Returns the number of elements in this collection.
//  */
// public fun <T> Iterable<T>.count(): Int {
//     if (this is Collection) return size
//     var count = 0
//     for (element in this) checkCountOverflow(++count)
//     return count
// }
//
// /**
//  * Returns the number of elements in this collection.
//  */
// @kotlin.internal.InlineOnly
// public inline fun <T> Collection<T>.count(): Int {
//     return size
// }
//
// /**
//  * Returns the number of elements matching the given [predicate].
//  */
// public inline fun <T> Iterable<T>.count(predicate: (T) -> Boolean): Int {
//     if (this is Collection && isEmpty()) return 0
//     var count = 0
//     for (element in this) if (predicate(element)) checkCountOverflow(++count)
//     return count
// }
//
// /**
//  * Accumulates value starting with [initial] value and applying [operation] from left to right
//  * to current accumulator value and each element.
//  *
//  * Returns the specified [initial] value if the collection is empty.
//  *
//  * @param [operation] function that takes current accumulator value and an element, and calculates the next accumulator value.
//  */
// public inline fun <T, R> Iterable<T>.fold(initial: R, operation: (acc: R, T) -> R): R {
//     var accumulator = initial
//     for (element in this) accumulator = operation(accumulator, element)
//     return accumulator
// }
//
// /**
//  * Accumulates value starting with [initial] value and applying [operation] from left to right
//  * to current accumulator value and each element with its index in the original collection.
//  *
//  * Returns the specified [initial] value if the collection is empty.
//  *
//  * @param [operation] function that takes the index of an element, current accumulator value
//  * and the element itself, and calculates the next accumulator value.
//  */
// public inline fun <T, R> Iterable<T>.foldIndexed(initial: R, operation: (index: Int, acc: R, T) -> R): R {
//     var index = 0
//     var accumulator = initial
//     for (element in this) accumulator = operation(checkIndexOverflow(index++), accumulator, element)
//     return accumulator
// }
//
// /**
//  * Accumulates value starting with [initial] value and applying [operation] from right to left
//  * to each element and current accumulator value.
//  *
//  * Returns the specified [initial] value if the list is empty.
//  *
//  * @param [operation] function that takes an element and current accumulator value, and calculates the next accumulator value.
//  */
// public inline fun <T, R> List<T>.foldRight(initial: R, operation: (T, acc: R) -> R): R {
//     var accumulator = initial
//     if (!isEmpty()) {
//         val iterator = listIterator(size)
//         while (iterator.hasPrevious()) {
//             accumulator = operation(iterator.previous(), accumulator)
//         }
//     }
//     return accumulator
// }
//
// /**
//  * Accumulates value starting with [initial] value and applying [operation] from right to left
//  * to each element with its index in the original list and current accumulator value.
//  *
//  * Returns the specified [initial] value if the list is empty.
//  *
//  * @param [operation] function that takes the index of an element, the element itself
//  * and current accumulator value, and calculates the next accumulator value.
//  */
// public inline fun <T, R> List<T>.foldRightIndexed(initial: R, operation: (index: Int, T, acc: R) -> R): R {
//     var accumulator = initial
//     if (!isEmpty()) {
//         val iterator = listIterator(size)
//         while (iterator.hasPrevious()) {
//             val index = iterator.previousIndex()
//             accumulator = operation(index, iterator.previous(), accumulator)
//         }
//     }
//     return accumulator
// }
//
// /**
//  * Performs the given [action] on each element.
//  */
// @kotlin.internal.HidesMembers
// public inline fun <T> Iterable<T>.forEach(action: (T) -> Unit): Unit {
//     for (element in this) action(element)
// }
//
// /**
//  * Performs the given [action] on each element, providing sequential index with the element.
//  * @param [action] function that takes the index of an element and the element itself
//  * and performs the action on the element.
//  */
// public inline fun <T> Iterable<T>.forEachIndexed(action: (index: Int, T) -> Unit): Unit {
//     var index = 0
//     for (item in this) action(checkIndexOverflow(index++), item)
// }
//
// @Deprecated("Use maxOrNull instead.", ReplaceWith("this.maxOrNull()"))
// @DeprecatedSinceKotlin(warningSince = "1.4", errorSince = "1.5", hiddenSince = "1.6")
// @SinceKotlin("1.1")
// public fun Iterable<Double>.max(): Double? {
//     return maxOrNull()
// }
//
// @Deprecated("Use maxOrNull instead.", ReplaceWith("this.maxOrNull()"))
// @DeprecatedSinceKotlin(warningSince = "1.4", errorSince = "1.5", hiddenSince = "1.6")
// @SinceKotlin("1.1")
// public fun Iterable<Float>.max(): Float? {
//     return maxOrNull()
// }
//
// @Deprecated("Use maxOrNull instead.", ReplaceWith("this.maxOrNull()"))
// @DeprecatedSinceKotlin(warningSince = "1.4", errorSince = "1.5", hiddenSince = "1.6")
// public fun <T : Comparable<T>> Iterable<T>.max(): T? {
//     return maxOrNull()
// }
//
// @Deprecated("Use maxByOrNull instead.", ReplaceWith("this.maxByOrNull(selector)"))
// @DeprecatedSinceKotlin(warningSince = "1.4", errorSince = "1.5", hiddenSince = "1.6")
// public inline fun <T, R : Comparable<R>> Iterable<T>.maxBy(selector: (T) -> R): T? {
//     return maxByOrNull(selector)
// }
//
// /**
//  * Returns the first element yielding the largest value of the given function or `null` if there are no elements.
//  *
//  * @sample samples.collections.Collections.Aggregates.maxByOrNull
//  */
// @SinceKotlin("1.4")
// public inline fun <T, R : Comparable<R>> Iterable<T>.maxByOrNull(selector: (T) -> R): T? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var maxElem = iterator.next()
//     if (!iterator.hasNext()) return maxElem
//     var maxValue = selector(maxElem)
//     do {
//         val e = iterator.next()
//         val v = selector(e)
//         if (maxValue < v) {
//             maxElem = e
//             maxValue = v
//         }
//     } while (iterator.hasNext())
//     return maxElem
// }
//
// /**
//  * Returns the largest value among all values produced by [selector] function
//  * applied to each element in the collection.
//  *
//  * If any of values produced by [selector] function is `NaN`, the returned result is `NaN`.
//  *
//  * @throws NoSuchElementException if the collection is empty.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.maxOf(selector: (T) -> Double): Double {
//     val iterator = iterator()
//     if (!iterator.hasNext()) throw NoSuchElementException()
//     var maxValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         maxValue = maxOf(maxValue, v)
//     }
//     return maxValue
// }
//
// /**
//  * Returns the largest value among all values produced by [selector] function
//  * applied to each element in the collection.
//  *
//  * If any of values produced by [selector] function is `NaN`, the returned result is `NaN`.
//  *
//  * @throws NoSuchElementException if the collection is empty.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.maxOf(selector: (T) -> Float): Float {
//     val iterator = iterator()
//     if (!iterator.hasNext()) throw NoSuchElementException()
//     var maxValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         maxValue = maxOf(maxValue, v)
//     }
//     return maxValue
// }
//
// /**
//  * Returns the largest value among all values produced by [selector] function
//  * applied to each element in the collection.
//  *
//  * @throws NoSuchElementException if the collection is empty.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T, R : Comparable<R>> Iterable<T>.maxOf(selector: (T) -> R): R {
//     val iterator = iterator()
//     if (!iterator.hasNext()) throw NoSuchElementException()
//     var maxValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         if (maxValue < v) {
//             maxValue = v
//         }
//     }
//     return maxValue
// }
//
// /**
//  * Returns the largest value among all values produced by [selector] function
//  * applied to each element in the collection or `null` if there are no elements.
//  *
//  * If any of values produced by [selector] function is `NaN`, the returned result is `NaN`.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.maxOfOrNull(selector: (T) -> Double): Double? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var maxValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         maxValue = maxOf(maxValue, v)
//     }
//     return maxValue
// }
//
// /**
//  * Returns the largest value among all values produced by [selector] function
//  * applied to each element in the collection or `null` if there are no elements.
//  *
//  * If any of values produced by [selector] function is `NaN`, the returned result is `NaN`.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.maxOfOrNull(selector: (T) -> Float): Float? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var maxValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         maxValue = maxOf(maxValue, v)
//     }
//     return maxValue
// }
//
// /**
//  * Returns the largest value among all values produced by [selector] function
//  * applied to each element in the collection or `null` if there are no elements.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T, R : Comparable<R>> Iterable<T>.maxOfOrNull(selector: (T) -> R): R? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var maxValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         if (maxValue < v) {
//             maxValue = v
//         }
//     }
//     return maxValue
// }
//
// /**
//  * Returns the largest value according to the provided [comparator]
//  * among all values produced by [selector] function applied to each element in the collection.
//  *
//  * @throws NoSuchElementException if the collection is empty.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T, R> Iterable<T>.maxOfWith(comparator: Comparator<in R>, selector: (T) -> R): R {
//     val iterator = iterator()
//     if (!iterator.hasNext()) throw NoSuchElementException()
//     var maxValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         if (comparator.compare(maxValue, v) < 0) {
//             maxValue = v
//         }
//     }
//     return maxValue
// }
//
// /**
//  * Returns the largest value according to the provided [comparator]
//  * among all values produced by [selector] function applied to each element in the collection or `null` if there are no elements.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T, R> Iterable<T>.maxOfWithOrNull(comparator: Comparator<in R>, selector: (T) -> R): R? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var maxValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         if (comparator.compare(maxValue, v) < 0) {
//             maxValue = v
//         }
//     }
//     return maxValue
// }
//
// /**
//  * Returns the largest element or `null` if there are no elements.
//  *
//  * If any of elements is `NaN` returns `NaN`.
//  */
// @SinceKotlin("1.4")
// public fun Iterable<Double>.maxOrNull(): Double? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var max = iterator.next()
//     while (iterator.hasNext()) {
//         val e = iterator.next()
//         max = maxOf(max, e)
//     }
//     return max
// }
//
// /**
//  * Returns the largest element or `null` if there are no elements.
//  *
//  * If any of elements is `NaN` returns `NaN`.
//  */
// @SinceKotlin("1.4")
// public fun Iterable<Float>.maxOrNull(): Float? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var max = iterator.next()
//     while (iterator.hasNext()) {
//         val e = iterator.next()
//         max = maxOf(max, e)
//     }
//     return max
// }
//
// /**
//  * Returns the largest element or `null` if there are no elements.
//  */
// @SinceKotlin("1.4")
// public fun <T : Comparable<T>> Iterable<T>.maxOrNull(): T? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var max = iterator.next()
//     while (iterator.hasNext()) {
//         val e = iterator.next()
//         if (max < e) max = e
//     }
//     return max
// }
//
// @Deprecated("Use maxWithOrNull instead.", ReplaceWith("this.maxWithOrNull(comparator)"))
// @DeprecatedSinceKotlin(warningSince = "1.4", errorSince = "1.5", hiddenSince = "1.6")
// public fun <T> Iterable<T>.maxWith(comparator: Comparator<in T>): T? {
//     return maxWithOrNull(comparator)
// }
//
// /**
//  * Returns the first element having the largest value according to the provided [comparator] or `null` if there are no elements.
//  */
// @SinceKotlin("1.4")
// public fun <T> Iterable<T>.maxWithOrNull(comparator: Comparator<in T>): T? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var max = iterator.next()
//     while (iterator.hasNext()) {
//         val e = iterator.next()
//         if (comparator.compare(max, e) < 0) max = e
//     }
//     return max
// }
//
// @Deprecated("Use minOrNull instead.", ReplaceWith("this.minOrNull()"))
// @DeprecatedSinceKotlin(warningSince = "1.4", errorSince = "1.5", hiddenSince = "1.6")
// @SinceKotlin("1.1")
// public fun Iterable<Double>.min(): Double? {
//     return minOrNull()
// }
//
// @Deprecated("Use minOrNull instead.", ReplaceWith("this.minOrNull()"))
// @DeprecatedSinceKotlin(warningSince = "1.4", errorSince = "1.5", hiddenSince = "1.6")
// @SinceKotlin("1.1")
// public fun Iterable<Float>.min(): Float? {
//     return minOrNull()
// }
//
// @Deprecated("Use minOrNull instead.", ReplaceWith("this.minOrNull()"))
// @DeprecatedSinceKotlin(warningSince = "1.4", errorSince = "1.5", hiddenSince = "1.6")
// public fun <T : Comparable<T>> Iterable<T>.min(): T? {
//     return minOrNull()
// }
//
// @Deprecated("Use minByOrNull instead.", ReplaceWith("this.minByOrNull(selector)"))
// @DeprecatedSinceKotlin(warningSince = "1.4", errorSince = "1.5", hiddenSince = "1.6")
// public inline fun <T, R : Comparable<R>> Iterable<T>.minBy(selector: (T) -> R): T? {
//     return minByOrNull(selector)
// }
//
// /**
//  * Returns the first element yielding the smallest value of the given function or `null` if there are no elements.
//  *
//  * @sample samples.collections.Collections.Aggregates.minByOrNull
//  */
// @SinceKotlin("1.4")
// public inline fun <T, R : Comparable<R>> Iterable<T>.minByOrNull(selector: (T) -> R): T? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var minElem = iterator.next()
//     if (!iterator.hasNext()) return minElem
//     var minValue = selector(minElem)
//     do {
//         val e = iterator.next()
//         val v = selector(e)
//         if (minValue > v) {
//             minElem = e
//             minValue = v
//         }
//     } while (iterator.hasNext())
//     return minElem
// }
//
// /**
//  * Returns the smallest value among all values produced by [selector] function
//  * applied to each element in the collection.
//  *
//  * If any of values produced by [selector] function is `NaN`, the returned result is `NaN`.
//  *
//  * @throws NoSuchElementException if the collection is empty.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.minOf(selector: (T) -> Double): Double {
//     val iterator = iterator()
//     if (!iterator.hasNext()) throw NoSuchElementException()
//     var minValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         minValue = minOf(minValue, v)
//     }
//     return minValue
// }
//
// /**
//  * Returns the smallest value among all values produced by [selector] function
//  * applied to each element in the collection.
//  *
//  * If any of values produced by [selector] function is `NaN`, the returned result is `NaN`.
//  *
//  * @throws NoSuchElementException if the collection is empty.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.minOf(selector: (T) -> Float): Float {
//     val iterator = iterator()
//     if (!iterator.hasNext()) throw NoSuchElementException()
//     var minValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         minValue = minOf(minValue, v)
//     }
//     return minValue
// }
//
// /**
//  * Returns the smallest value among all values produced by [selector] function
//  * applied to each element in the collection.
//  *
//  * @throws NoSuchElementException if the collection is empty.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T, R : Comparable<R>> Iterable<T>.minOf(selector: (T) -> R): R {
//     val iterator = iterator()
//     if (!iterator.hasNext()) throw NoSuchElementException()
//     var minValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         if (minValue > v) {
//             minValue = v
//         }
//     }
//     return minValue
// }
//
// /**
//  * Returns the smallest value among all values produced by [selector] function
//  * applied to each element in the collection or `null` if there are no elements.
//  *
//  * If any of values produced by [selector] function is `NaN`, the returned result is `NaN`.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.minOfOrNull(selector: (T) -> Double): Double? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var minValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         minValue = minOf(minValue, v)
//     }
//     return minValue
// }
//
// /**
//  * Returns the smallest value among all values produced by [selector] function
//  * applied to each element in the collection or `null` if there are no elements.
//  *
//  * If any of values produced by [selector] function is `NaN`, the returned result is `NaN`.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.minOfOrNull(selector: (T) -> Float): Float? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var minValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         minValue = minOf(minValue, v)
//     }
//     return minValue
// }
//
// /**
//  * Returns the smallest value among all values produced by [selector] function
//  * applied to each element in the collection or `null` if there are no elements.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T, R : Comparable<R>> Iterable<T>.minOfOrNull(selector: (T) -> R): R? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var minValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         if (minValue > v) {
//             minValue = v
//         }
//     }
//     return minValue
// }
//
// /**
//  * Returns the smallest value according to the provided [comparator]
//  * among all values produced by [selector] function applied to each element in the collection.
//  *
//  * @throws NoSuchElementException if the collection is empty.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T, R> Iterable<T>.minOfWith(comparator: Comparator<in R>, selector: (T) -> R): R {
//     val iterator = iterator()
//     if (!iterator.hasNext()) throw NoSuchElementException()
//     var minValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         if (comparator.compare(minValue, v) > 0) {
//             minValue = v
//         }
//     }
//     return minValue
// }
//
// /**
//  * Returns the smallest value according to the provided [comparator]
//  * among all values produced by [selector] function applied to each element in the collection or `null` if there are no elements.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.internal.InlineOnly
// public inline fun <T, R> Iterable<T>.minOfWithOrNull(comparator: Comparator<in R>, selector: (T) -> R): R? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var minValue = selector(iterator.next())
//     while (iterator.hasNext()) {
//         val v = selector(iterator.next())
//         if (comparator.compare(minValue, v) > 0) {
//             minValue = v
//         }
//     }
//     return minValue
// }
//
// /**
//  * Returns the smallest element or `null` if there are no elements.
//  *
//  * If any of elements is `NaN` returns `NaN`.
//  */
// @SinceKotlin("1.4")
// public fun Iterable<Double>.minOrNull(): Double? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var min = iterator.next()
//     while (iterator.hasNext()) {
//         val e = iterator.next()
//         min = minOf(min, e)
//     }
//     return min
// }
//
// /**
//  * Returns the smallest element or `null` if there are no elements.
//  *
//  * If any of elements is `NaN` returns `NaN`.
//  */
// @SinceKotlin("1.4")
// public fun Iterable<Float>.minOrNull(): Float? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var min = iterator.next()
//     while (iterator.hasNext()) {
//         val e = iterator.next()
//         min = minOf(min, e)
//     }
//     return min
// }
//
// /**
//  * Returns the smallest element or `null` if there are no elements.
//  */
// @SinceKotlin("1.4")
// public fun <T : Comparable<T>> Iterable<T>.minOrNull(): T? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var min = iterator.next()
//     while (iterator.hasNext()) {
//         val e = iterator.next()
//         if (min > e) min = e
//     }
//     return min
// }
//
// @Deprecated("Use minWithOrNull instead.", ReplaceWith("this.minWithOrNull(comparator)"))
// @DeprecatedSinceKotlin(warningSince = "1.4", errorSince = "1.5", hiddenSince = "1.6")
// public fun <T> Iterable<T>.minWith(comparator: Comparator<in T>): T? {
//     return minWithOrNull(comparator)
// }
//
// /**
//  * Returns the first element having the smallest value according to the provided [comparator] or `null` if there are no elements.
//  */
// @SinceKotlin("1.4")
// public fun <T> Iterable<T>.minWithOrNull(comparator: Comparator<in T>): T? {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return null
//     var min = iterator.next()
//     while (iterator.hasNext()) {
//         val e = iterator.next()
//         if (comparator.compare(min, e) > 0) min = e
//     }
//     return min
// }
//
// /**
//  * Returns `true` if the collection has no elements.
//  *
//  * @sample samples.collections.Collections.Aggregates.none
//  */
// public fun <T> Iterable<T>.none(): Boolean {
//     if (this is Collection) return isEmpty()
//     return !iterator().hasNext()
// }
//
// /**
//  * Returns `true` if no elements match the given [predicate].
//  *
//  * @sample samples.collections.Collections.Aggregates.noneWithPredicate
//  */
// public inline fun <T> Iterable<T>.none(predicate: (T) -> Boolean): Boolean {
//     if (this is Collection && isEmpty()) return true
//     for (element in this) if (predicate(element)) return false
//     return true
// }
//
// /**
//  * Performs the given [action] on each element and returns the collection itself afterwards.
//  */
// @SinceKotlin("1.1")
// public inline fun <T, C : Iterable<T>> C.onEach(action: (T) -> Unit): C {
//     return apply { for (element in this) action(element) }
// }
//
// /**
//  * Performs the given [action] on each element, providing sequential index with the element,
//  * and returns the collection itself afterwards.
//  * @param [action] function that takes the index of an element and the element itself
//  * and performs the action on the element.
//  */
// @SinceKotlin("1.4")
// public inline fun <T, C : Iterable<T>> C.onEachIndexed(action: (index: Int, T) -> Unit): C {
//     return apply { forEachIndexed(action) }
// }
//
// /**
//  * Accumulates value starting with the first element and applying [operation] from left to right
//  * to current accumulator value and each element.
//  *
//  * Throws an exception if this collection is empty. If the collection can be empty in an expected way,
//  * please use [reduceOrNull] instead. It returns `null` when its receiver is empty.
//  *
//  * @param [operation] function that takes current accumulator value and an element,
//  * and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.reduce
//  */
// public inline fun <S, T : S> Iterable<T>.reduce(operation: (acc: S, T) -> S): S {
//     val iterator = this.iterator()
//     if (!iterator.hasNext()) throw UnsupportedOperationException("Empty collection can't be reduced.")
//     var accumulator: S = iterator.next()
//     while (iterator.hasNext()) {
//         accumulator = operation(accumulator, iterator.next())
//     }
//     return accumulator
// }
//
// /**
//  * Accumulates value starting with the first element and applying [operation] from left to right
//  * to current accumulator value and each element with its index in the original collection.
//  *
//  * Throws an exception if this collection is empty. If the collection can be empty in an expected way,
//  * please use [reduceIndexedOrNull] instead. It returns `null` when its receiver is empty.
//  *
//  * @param [operation] function that takes the index of an element, current accumulator value and the element itself,
//  * and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.reduce
//  */
// public inline fun <S, T : S> Iterable<T>.reduceIndexed(operation: (index: Int, acc: S, T) -> S): S {
//     val iterator = this.iterator()
//     if (!iterator.hasNext()) throw UnsupportedOperationException("Empty collection can't be reduced.")
//     var index = 1
//     var accumulator: S = iterator.next()
//     while (iterator.hasNext()) {
//         accumulator = operation(checkIndexOverflow(index++), accumulator, iterator.next())
//     }
//     return accumulator
// }
//
// /**
//  * Accumulates value starting with the first element and applying [operation] from left to right
//  * to current accumulator value and each element with its index in the original collection.
//  *
//  * Returns `null` if the collection is empty.
//  *
//  * @param [operation] function that takes the index of an element, current accumulator value and the element itself,
//  * and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.reduceOrNull
//  */
// @SinceKotlin("1.4")
// public inline fun <S, T : S> Iterable<T>.reduceIndexedOrNull(operation: (index: Int, acc: S, T) -> S): S? {
//     val iterator = this.iterator()
//     if (!iterator.hasNext()) return null
//     var index = 1
//     var accumulator: S = iterator.next()
//     while (iterator.hasNext()) {
//         accumulator = operation(checkIndexOverflow(index++), accumulator, iterator.next())
//     }
//     return accumulator
// }
//
// /**
//  * Accumulates value starting with the first element and applying [operation] from left to right
//  * to current accumulator value and each element.
//  *
//  * Returns `null` if the collection is empty.
//  *
//  * @param [operation] function that takes current accumulator value and an element,
//  * and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.reduceOrNull
//  */
// @SinceKotlin("1.4")
// @WasExperimental(ExperimentalStdlibApi::class)
// public inline fun <S, T : S> Iterable<T>.reduceOrNull(operation: (acc: S, T) -> S): S? {
//     val iterator = this.iterator()
//     if (!iterator.hasNext()) return null
//     var accumulator: S = iterator.next()
//     while (iterator.hasNext()) {
//         accumulator = operation(accumulator, iterator.next())
//     }
//     return accumulator
// }
//
// /**
//  * Accumulates value starting with the last element and applying [operation] from right to left
//  * to each element and current accumulator value.
//  *
//  * Throws an exception if this list is empty. If the list can be empty in an expected way,
//  * please use [reduceRightOrNull] instead. It returns `null` when its receiver is empty.
//  *
//  * @param [operation] function that takes an element and current accumulator value,
//  * and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.reduceRight
//  */
// public inline fun <S, T : S> List<T>.reduceRight(operation: (T, acc: S) -> S): S {
//     val iterator = listIterator(size)
//     if (!iterator.hasPrevious())
//         throw UnsupportedOperationException("Empty list can't be reduced.")
//     var accumulator: S = iterator.previous()
//     while (iterator.hasPrevious()) {
//         accumulator = operation(iterator.previous(), accumulator)
//     }
//     return accumulator
// }
//
// /**
//  * Accumulates value starting with the last element and applying [operation] from right to left
//  * to each element with its index in the original list and current accumulator value.
//  *
//  * Throws an exception if this list is empty. If the list can be empty in an expected way,
//  * please use [reduceRightIndexedOrNull] instead. It returns `null` when its receiver is empty.
//  *
//  * @param [operation] function that takes the index of an element, the element itself and current accumulator value,
//  * and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.reduceRight
//  */
// public inline fun <S, T : S> List<T>.reduceRightIndexed(operation: (index: Int, T, acc: S) -> S): S {
//     val iterator = listIterator(size)
//     if (!iterator.hasPrevious())
//         throw UnsupportedOperationException("Empty list can't be reduced.")
//     var accumulator: S = iterator.previous()
//     while (iterator.hasPrevious()) {
//         val index = iterator.previousIndex()
//         accumulator = operation(index, iterator.previous(), accumulator)
//     }
//     return accumulator
// }
//
// /**
//  * Accumulates value starting with the last element and applying [operation] from right to left
//  * to each element with its index in the original list and current accumulator value.
//  *
//  * Returns `null` if the list is empty.
//  *
//  * @param [operation] function that takes the index of an element, the element itself and current accumulator value,
//  * and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.reduceRightOrNull
//  */
// @SinceKotlin("1.4")
// public inline fun <S, T : S> List<T>.reduceRightIndexedOrNull(operation: (index: Int, T, acc: S) -> S): S? {
//     val iterator = listIterator(size)
//     if (!iterator.hasPrevious())
//         return null
//     var accumulator: S = iterator.previous()
//     while (iterator.hasPrevious()) {
//         val index = iterator.previousIndex()
//         accumulator = operation(index, iterator.previous(), accumulator)
//     }
//     return accumulator
// }
//
// /**
//  * Accumulates value starting with the last element and applying [operation] from right to left
//  * to each element and current accumulator value.
//  *
//  * Returns `null` if the list is empty.
//  *
//  * @param [operation] function that takes an element and current accumulator value,
//  * and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.reduceRightOrNull
//  */
// @SinceKotlin("1.4")
// @WasExperimental(ExperimentalStdlibApi::class)
// public inline fun <S, T : S> List<T>.reduceRightOrNull(operation: (T, acc: S) -> S): S? {
//     val iterator = listIterator(size)
//     if (!iterator.hasPrevious())
//         return null
//     var accumulator: S = iterator.previous()
//     while (iterator.hasPrevious()) {
//         accumulator = operation(iterator.previous(), accumulator)
//     }
//     return accumulator
// }
//
// /**
//  * Returns a list containing successive accumulation values generated by applying [operation] from left to right
//  * to each element and current accumulator value that starts with [initial] value.
//  *
//  * Note that `acc` value passed to [operation] function should not be mutated;
//  * otherwise it would affect the previous value in resulting list.
//  *
//  * @param [operation] function that takes current accumulator value and an element, and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.runningFold
//  */
// @SinceKotlin("1.4")
// public inline fun <T, R> Iterable<T>.runningFold(initial: R, operation: (acc: R, T) -> R): List<R> {
//     val estimatedSize = collectionSizeOrDefault(9)
//     if (estimatedSize == 0) return listOf(initial)
//     val result = ArrayList<R>(estimatedSize + 1).apply { add(initial) }
//     var accumulator = initial
//     for (element in this) {
//         accumulator = operation(accumulator, element)
//         result.add(accumulator)
//     }
//     return result
// }
//
// /**
//  * Returns a list containing successive accumulation values generated by applying [operation] from left to right
//  * to each element, its index in the original collection and current accumulator value that starts with [initial] value.
//  *
//  * Note that `acc` value passed to [operation] function should not be mutated;
//  * otherwise it would affect the previous value in resulting list.
//  *
//  * @param [operation] function that takes the index of an element, current accumulator value
//  * and the element itself, and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.runningFold
//  */
// @SinceKotlin("1.4")
// public inline fun <T, R> Iterable<T>.runningFoldIndexed(initial: R, operation: (index: Int, acc: R, T) -> R): List<R> {
//     val estimatedSize = collectionSizeOrDefault(9)
//     if (estimatedSize == 0) return listOf(initial)
//     val result = ArrayList<R>(estimatedSize + 1).apply { add(initial) }
//     var index = 0
//     var accumulator = initial
//     for (element in this) {
//         accumulator = operation(index++, accumulator, element)
//         result.add(accumulator)
//     }
//     return result
// }
//
// /**
//  * Returns a list containing successive accumulation values generated by applying [operation] from left to right
//  * to each element and current accumulator value that starts with the first element of this collection.
//  *
//  * Note that `acc` value passed to [operation] function should not be mutated;
//  * otherwise it would affect the previous value in resulting list.
//  *
//  * @param [operation] function that takes current accumulator value and the element, and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.runningReduce
//  */
// @SinceKotlin("1.4")
// @WasExperimental(ExperimentalStdlibApi::class)
// public inline fun <S, T : S> Iterable<T>.runningReduce(operation: (acc: S, T) -> S): List<S> {
//     val iterator = this.iterator()
//     if (!iterator.hasNext()) return emptyList()
//     var accumulator: S = iterator.next()
//     val result = ArrayList<S>(collectionSizeOrDefault(10)).apply { add(accumulator) }
//     while (iterator.hasNext()) {
//         accumulator = operation(accumulator, iterator.next())
//         result.add(accumulator)
//     }
//     return result
// }
//
// /**
//  * Returns a list containing successive accumulation values generated by applying [operation] from left to right
//  * to each element, its index in the original collection and current accumulator value that starts with the first element of this collection.
//  *
//  * Note that `acc` value passed to [operation] function should not be mutated;
//  * otherwise it would affect the previous value in resulting list.
//  *
//  * @param [operation] function that takes the index of an element, current accumulator value
//  * and the element itself, and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.runningReduce
//  */
// @SinceKotlin("1.4")
// public inline fun <S, T : S> Iterable<T>.runningReduceIndexed(operation: (index: Int, acc: S, T) -> S): List<S> {
//     val iterator = this.iterator()
//     if (!iterator.hasNext()) return emptyList()
//     var accumulator: S = iterator.next()
//     val result = ArrayList<S>(collectionSizeOrDefault(10)).apply { add(accumulator) }
//     var index = 1
//     while (iterator.hasNext()) {
//         accumulator = operation(index++, accumulator, iterator.next())
//         result.add(accumulator)
//     }
//     return result
// }
//
// /**
//  * Returns a list containing successive accumulation values generated by applying [operation] from left to right
//  * to each element and current accumulator value that starts with [initial] value.
//  *
//  * Note that `acc` value passed to [operation] function should not be mutated;
//  * otherwise it would affect the previous value in resulting list.
//  *
//  * @param [operation] function that takes current accumulator value and an element, and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.scan
//  */
// @SinceKotlin("1.4")
// @WasExperimental(ExperimentalStdlibApi::class)
// public inline fun <T, R> Iterable<T>.scan(initial: R, operation: (acc: R, T) -> R): List<R> {
//     return runningFold(initial, operation)
// }
//
// /**
//  * Returns a list containing successive accumulation values generated by applying [operation] from left to right
//  * to each element, its index in the original collection and current accumulator value that starts with [initial] value.
//  *
//  * Note that `acc` value passed to [operation] function should not be mutated;
//  * otherwise it would affect the previous value in resulting list.
//  *
//  * @param [operation] function that takes the index of an element, current accumulator value
//  * and the element itself, and calculates the next accumulator value.
//  *
//  * @sample samples.collections.Collections.Aggregates.scan
//  */
// @SinceKotlin("1.4")
// @WasExperimental(ExperimentalStdlibApi::class)
// public inline fun <T, R> Iterable<T>.scanIndexed(initial: R, operation: (index: Int, acc: R, T) -> R): List<R> {
//     return runningFoldIndexed(initial, operation)
// }
//
// /**
//  * Returns the sum of all values produced by [selector] function applied to each element in the collection.
//  */
// @Deprecated("Use sumOf instead.", ReplaceWith("this.sumOf(selector)"))
// @DeprecatedSinceKotlin(warningSince = "1.5")
// public inline fun <T> Iterable<T>.sumBy(selector: (T) -> Int): Int {
//     var sum: Int = 0
//     for (element in this) {
//         sum += selector(element)
//     }
//     return sum
// }
//
// /**
//  * Returns the sum of all values produced by [selector] function applied to each element in the collection.
//  */
// @Deprecated("Use sumOf instead.", ReplaceWith("this.sumOf(selector)"))
// @DeprecatedSinceKotlin(warningSince = "1.5")
// public inline fun <T> Iterable<T>.sumByDouble(selector: (T) -> Double): Double {
//     var sum: Double = 0.0
//     for (element in this) {
//         sum += selector(element)
//     }
//     return sum
// }
//
// /**
//  * Returns the sum of all values produced by [selector] function applied to each element in the collection.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.jvm.JvmName("sumOfDouble")
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.sumOf(selector: (T) -> Double): Double {
//     var sum: Double = 0.toDouble()
//     for (element in this) {
//         sum += selector(element)
//     }
//     return sum
// }
//
// /**
//  * Returns the sum of all values produced by [selector] function applied to each element in the collection.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.jvm.JvmName("sumOfInt")
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.sumOf(selector: (T) -> Int): Int {
//     var sum: Int = 0.toInt()
//     for (element in this) {
//         sum += selector(element)
//     }
//     return sum
// }
//
// /**
//  * Returns the sum of all values produced by [selector] function applied to each element in the collection.
//  */
// @SinceKotlin("1.4")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.jvm.JvmName("sumOfLong")
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.sumOf(selector: (T) -> Long): Long {
//     var sum: Long = 0.toLong()
//     for (element in this) {
//         sum += selector(element)
//     }
//     return sum
// }
//
// /**
//  * Returns the sum of all values produced by [selector] function applied to each element in the collection.
//  */
// @SinceKotlin("1.5")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.jvm.JvmName("sumOfUInt")
// @WasExperimental(ExperimentalUnsignedTypes::class)
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.sumOf(selector: (T) -> UInt): UInt {
//     var sum: UInt = 0.toUInt()
//     for (element in this) {
//         sum += selector(element)
//     }
//     return sum
// }
//
// /**
//  * Returns the sum of all values produced by [selector] function applied to each element in the collection.
//  */
// @SinceKotlin("1.5")
// @OptIn(kotlin.experimental.ExperimentalTypeInference::class)
// @OverloadResolutionByLambdaReturnType
// @kotlin.jvm.JvmName("sumOfULong")
// @WasExperimental(ExperimentalUnsignedTypes::class)
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.sumOf(selector: (T) -> ULong): ULong {
//     var sum: ULong = 0.toULong()
//     for (element in this) {
//         sum += selector(element)
//     }
//     return sum
// }
//
// /**
//  * Returns an original collection containing all the non-`null` elements, throwing an [IllegalArgumentException] if there are any `null` elements.
//  */
// public fun <T : Any> Iterable<T?>.requireNoNulls(): Iterable<T> {
//     for (element in this) {
//         if (element == null) {
//             throw IllegalArgumentException("null element found in $this.")
//         }
//     }
//     @Suppress("UNCHECKED_CAST")
//     return this as Iterable<T>
// }
//
// /**
//  * Returns an original collection containing all the non-`null` elements, throwing an [IllegalArgumentException] if there are any `null` elements.
//  */
// public fun <T : Any> List<T?>.requireNoNulls(): List<T> {
//     for (element in this) {
//         if (element == null) {
//             throw IllegalArgumentException("null element found in $this.")
//         }
//     }
//     @Suppress("UNCHECKED_CAST")
//     return this as List<T>
// }
//
// /**
//  * Splits this collection into a list of lists each not exceeding the given [size].
//  *
//  * The last list in the resulting list may have fewer elements than the given [size].
//  *
//  * @param size the number of elements to take in each list, must be positive and can be greater than the number of elements in this collection.
//  *
//  * @sample samples.collections.Collections.Transformations.chunked
//  */
// @SinceKotlin("1.2")
// public fun <T> Iterable<T>.chunked(size: Int): List<List<T>> {
//     return windowed(size, size, partialWindows = true)
// }
//
// /**
//  * Splits this collection into several lists each not exceeding the given [size]
//  * and applies the given [transform] function to an each.
//  *
//  * @return list of results of the [transform] applied to an each list.
//  *
//  * Note that the list passed to the [transform] function is ephemeral and is valid only inside that function.
//  * You should not store it or allow it to escape in some way, unless you made a snapshot of it.
//  * The last list may have fewer elements than the given [size].
//  *
//  * @param size the number of elements to take in each list, must be positive and can be greater than the number of elements in this collection.
//  *
//  * @sample samples.text.Strings.chunkedTransform
//  */
// @SinceKotlin("1.2")
// public fun <T, R> Iterable<T>.chunked(size: Int, transform: (List<T>) -> R): List<R> {
//     return windowed(size, size, partialWindows = true, transform = transform)
// }
//
// /**
//  * Returns a list containing all elements of the original collection without the first occurrence of the given [element].
//  */
// public operator fun <T> Iterable<T>.minus(element: T): List<T> {
//     val result = ArrayList<T>(collectionSizeOrDefault(10))
//     var removed = false
//     return this.filterTo(result) { if (!removed && it == element) { removed = true; false } else true }
// }
//
// /**
//  * Returns a list containing all elements of the original collection except the elements contained in the given [elements] array.
//  *
//  * Before Kotlin 1.6, the [elements] array may have been converted to a [HashSet] to speed up the operation, thus the elements were required to have
//  * a correct and stable implementation of `hashCode()` that didn't change between successive invocations.
//  * On JVM, you can enable this behavior back with the system property `kotlin.collections.convert_arg_to_set_in_removeAll` set to `true`.
//  */
// public operator fun <T> Iterable<T>.minus(elements: Array<out T>): List<T> {
//     if (elements.isEmpty()) return this.toList()
//     val other = elements.convertToSetForSetOperation()
//     return this.filterNot { it in other }
// }
//
// /**
//  * Returns a list containing all elements of the original collection except the elements contained in the given [elements] collection.
//  *
//  * Before Kotlin 1.6, the [elements] collection may have been converted to a [HashSet] to speed up the operation, thus the elements were required to have
//  * a correct and stable implementation of `hashCode()` that didn't change between successive invocations.
//  * On JVM, you can enable this behavior back with the system property `kotlin.collections.convert_arg_to_set_in_removeAll` set to `true`.
//  */
// public operator fun <T> Iterable<T>.minus(elements: Iterable<T>): List<T> {
//     val other = elements.convertToSetForSetOperationWith(this)
//     if (other.isEmpty())
//         return this.toList()
//     return this.filterNot { it in other }
// }
//
// /**
//  * Returns a list containing all elements of the original collection except the elements contained in the given [elements] sequence.
//  *
//  * Before Kotlin 1.6, the [elements] sequence may have been converted to a [HashSet] to speed up the operation, thus the elements were required to have
//  * a correct and stable implementation of `hashCode()` that didn't change between successive invocations.
//  * On JVM, you can enable this behavior back with the system property `kotlin.collections.convert_arg_to_set_in_removeAll` set to `true`.
//  */
// public operator fun <T> Iterable<T>.minus(elements: Sequence<T>): List<T> {
//     val other = elements.convertToSetForSetOperation()
//     if (other.isEmpty())
//         return this.toList()
//     return this.filterNot { it in other }
// }
//
// /**
//  * Returns a list containing all elements of the original collection without the first occurrence of the given [element].
//  */
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.minusElement(element: T): List<T> {
//     return minus(element)
// }
//
// /**
//  * Splits the original collection into pair of lists,
//  * where *first* list contains elements for which [predicate] yielded `true`,
//  * while *second* list contains elements for which [predicate] yielded `false`.
//  *
//  * @sample samples.collections.Iterables.Operations.partition
//  */
// public inline fun <T> Iterable<T>.partition(predicate: (T) -> Boolean): Pair<List<T>, List<T>> {
//     val first = ArrayList<T>()
//     val second = ArrayList<T>()
//     for (element in this) {
//         if (predicate(element)) {
//             first.add(element)
//         } else {
//             second.add(element)
//         }
//     }
//     return Pair(first, second)
// }
//
// /**
//  * Returns a list containing all elements of the original collection and then the given [element].
//  */
// public operator fun <T> Iterable<T>.plus(element: T): List<T> {
//     if (this is Collection) return this.plus(element)
//     val result = ArrayList<T>()
//     result.addAll(this)
//     result.add(element)
//     return result
// }
//
// /**
//  * Returns a list containing all elements of the original collection and then the given [element].
//  */
// public operator fun <T> Collection<T>.plus(element: T): List<T> {
//     val result = ArrayList<T>(size + 1)
//     result.addAll(this)
//     result.add(element)
//     return result
// }
//
// /**
//  * Returns a list containing all elements of the original collection and then all elements of the given [elements] array.
//  */
// public operator fun <T> Iterable<T>.plus(elements: Array<out T>): List<T> {
//     if (this is Collection) return this.plus(elements)
//     val result = ArrayList<T>()
//     result.addAll(this)
//     result.addAll(elements)
//     return result
// }
//
// /**
//  * Returns a list containing all elements of the original collection and then all elements of the given [elements] array.
//  */
// public operator fun <T> Collection<T>.plus(elements: Array<out T>): List<T> {
//     val result = ArrayList<T>(this.size + elements.size)
//     result.addAll(this)
//     result.addAll(elements)
//     return result
// }
//
// /**
//  * Returns a list containing all elements of the original collection and then all elements of the given [elements] collection.
//  */
// public operator fun <T> Iterable<T>.plus(elements: Iterable<T>): List<T> {
//     if (this is Collection) return this.plus(elements)
//     val result = ArrayList<T>()
//     result.addAll(this)
//     result.addAll(elements)
//     return result
// }
//
// /**
//  * Returns a list containing all elements of the original collection and then all elements of the given [elements] collection.
//  */
// public operator fun <T> Collection<T>.plus(elements: Iterable<T>): List<T> {
//     if (elements is Collection) {
//         val result = ArrayList<T>(this.size + elements.size)
//         result.addAll(this)
//         result.addAll(elements)
//         return result
//     } else {
//         val result = ArrayList<T>(this)
//         result.addAll(elements)
//         return result
//     }
// }
//
// /**
//  * Returns a list containing all elements of the original collection and then all elements of the given [elements] sequence.
//  */
// public operator fun <T> Iterable<T>.plus(elements: Sequence<T>): List<T> {
//     val result = ArrayList<T>()
//     result.addAll(this)
//     result.addAll(elements)
//     return result
// }
//
// /**
//  * Returns a list containing all elements of the original collection and then all elements of the given [elements] sequence.
//  */
// public operator fun <T> Collection<T>.plus(elements: Sequence<T>): List<T> {
//     val result = ArrayList<T>(this.size + 10)
//     result.addAll(this)
//     result.addAll(elements)
//     return result
// }
//
// /**
//  * Returns a list containing all elements of the original collection and then the given [element].
//  */
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.plusElement(element: T): List<T> {
//     return plus(element)
// }
//
// /**
//  * Returns a list containing all elements of the original collection and then the given [element].
//  */
// @kotlin.internal.InlineOnly
// public inline fun <T> Collection<T>.plusElement(element: T): List<T> {
//     return plus(element)
// }
//
// /**
//  * Returns a list of snapshots of the window of the given [size]
//  * sliding along this collection with the given [step], where each
//  * snapshot is a list.
//  *
//  * Several last lists may have fewer elements than the given [size].
//  *
//  * Both [size] and [step] must be positive and can be greater than the number of elements in this collection.
//  * @param size the number of elements to take in each window
//  * @param step the number of elements to move the window forward by on an each step, by default 1
//  * @param partialWindows controls whether or not to keep partial windows in the end if any,
//  * by default `false` which means partial windows won't be preserved
//  *
//  * @sample samples.collections.Sequences.Transformations.takeWindows
//  */
// @SinceKotlin("1.2")
// public fun <T> Iterable<T>.windowed(size: Int, step: Int = 1, partialWindows: Boolean = false): List<List<T>> {
//     checkWindowSizeStep(size, step)
//     if (this is RandomAccess && this is List) {
//         val thisSize = this.size
//         val resultCapacity = thisSize / step + if (thisSize % step == 0) 0 else 1
//         val result = ArrayList<List<T>>(resultCapacity)
//         var index = 0
//         while (index in 0 until thisSize) {
//             val windowSize = size.coerceAtMost(thisSize - index)
//             if (windowSize < size && !partialWindows) break
//             result.add(List(windowSize) { this[it + index] })
//             index += step
//         }
//         return result
//     }
//     val result = ArrayList<List<T>>()
//     windowedIterator(iterator(), size, step, partialWindows, reuseBuffer = false).forEach {
//         result.add(it)
//     }
//     return result
// }
//
// /**
//  * Returns a list of results of applying the given [transform] function to
//  * an each list representing a view over the window of the given [size]
//  * sliding along this collection with the given [step].
//  *
//  * Note that the list passed to the [transform] function is ephemeral and is valid only inside that function.
//  * You should not store it or allow it to escape in some way, unless you made a snapshot of it.
//  * Several last lists may have fewer elements than the given [size].
//  *
//  * Both [size] and [step] must be positive and can be greater than the number of elements in this collection.
//  * @param size the number of elements to take in each window
//  * @param step the number of elements to move the window forward by on an each step, by default 1
//  * @param partialWindows controls whether or not to keep partial windows in the end if any,
//  * by default `false` which means partial windows won't be preserved
//  *
//  * @sample samples.collections.Sequences.Transformations.averageWindows
//  */
// @SinceKotlin("1.2")
// public fun <T, R> Iterable<T>.windowed(size: Int, step: Int = 1, partialWindows: Boolean = false, transform: (List<T>) -> R): List<R> {
//     checkWindowSizeStep(size, step)
//     if (this is RandomAccess && this is List) {
//         val thisSize = this.size
//         val resultCapacity = thisSize / step + if (thisSize % step == 0) 0 else 1
//         val result = ArrayList<R>(resultCapacity)
//         val window = MovingSubList(this)
//         var index = 0
//         while (index in 0 until thisSize) {
//             val windowSize = size.coerceAtMost(thisSize - index)
//             if (!partialWindows && windowSize < size) break
//             window.move(index, index + windowSize)
//             result.add(transform(window))
//             index += step
//         }
//         return result
//     }
//     val result = ArrayList<R>()
//     windowedIterator(iterator(), size, step, partialWindows, reuseBuffer = true).forEach {
//         result.add(transform(it))
//     }
//     return result
// }
//
// /**
//  * Returns a list of pairs built from the elements of `this` collection and the [other] array with the same index.
//  * The returned list has length of the shortest collection.
//  *
//  * @sample samples.collections.Iterables.Operations.zipIterable
//  */
// public infix fun <T, R> Iterable<T>.zip(other: Array<out R>): List<Pair<T, R>> {
//     return zip(other) { t1, t2 -> t1 to t2 }
// }
//
// /**
//  * Returns a list of values built from the elements of `this` collection and the [other] array with the same index
//  * using the provided [transform] function applied to each pair of elements.
//  * The returned list has length of the shortest collection.
//  *
//  * @sample samples.collections.Iterables.Operations.zipIterableWithTransform
//  */
// public inline fun <T, R, V> Iterable<T>.zip(other: Array<out R>, transform: (a: T, b: R) -> V): List<V> {
//     val arraySize = other.size
//     val list = ArrayList<V>(minOf(collectionSizeOrDefault(10), arraySize))
//     var i = 0
//     for (element in this) {
//         if (i >= arraySize) break
//         list.add(transform(element, other[i++]))
//     }
//     return list
// }
//
// /**
//  * Returns a list of pairs built from the elements of `this` collection and [other] collection with the same index.
//  * The returned list has length of the shortest collection.
//  *
//  * @sample samples.collections.Iterables.Operations.zipIterable
//  */
// public infix fun <T, R> Iterable<T>.zip(other: Iterable<R>): List<Pair<T, R>> {
//     return zip(other) { t1, t2 -> t1 to t2 }
// }
//
// /**
//  * Returns a list of values built from the elements of `this` collection and the [other] collection with the same index
//  * using the provided [transform] function applied to each pair of elements.
//  * The returned list has length of the shortest collection.
//  *
//  * @sample samples.collections.Iterables.Operations.zipIterableWithTransform
//  */
// public inline fun <T, R, V> Iterable<T>.zip(other: Iterable<R>, transform: (a: T, b: R) -> V): List<V> {
//     val first = iterator()
//     val second = other.iterator()
//     val list = ArrayList<V>(minOf(collectionSizeOrDefault(10), other.collectionSizeOrDefault(10)))
//     while (first.hasNext() && second.hasNext()) {
//         list.add(transform(first.next(), second.next()))
//     }
//     return list
// }
//
// /**
//  * Returns a list of pairs of each two adjacent elements in this collection.
//  *
//  * The returned list is empty if this collection contains less than two elements.
//  *
//  * @sample samples.collections.Collections.Transformations.zipWithNext
//  */
// @SinceKotlin("1.2")
// public fun <T> Iterable<T>.zipWithNext(): List<Pair<T, T>> {
//     return zipWithNext { a, b -> a to b }
// }
//
// /**
//  * Returns a list containing the results of applying the given [transform] function
//  * to an each pair of two adjacent elements in this collection.
//  *
//  * The returned list is empty if this collection contains less than two elements.
//  *
//  * @sample samples.collections.Collections.Transformations.zipWithNextToFindDeltas
//  */
// @SinceKotlin("1.2")
// public inline fun <T, R> Iterable<T>.zipWithNext(transform: (a: T, b: T) -> R): List<R> {
//     val iterator = iterator()
//     if (!iterator.hasNext()) return emptyList()
//     val result = mutableListOf<R>()
//     var current = iterator.next()
//     while (iterator.hasNext()) {
//         val next = iterator.next()
//         result.add(transform(current, next))
//         current = next
//     }
//     return result
// }
//
// /**
//  * Appends the string from all the elements separated using [separator] and using the given [prefix] and [postfix] if supplied.
//  *
//  * If the collection could be huge, you can specify a non-negative value of [limit], in which case only the first [limit]
//  * elements will be appended, followed by the [truncated] string (which defaults to "...").
//  *
//  * @sample samples.collections.Collections.Transformations.joinTo
//  */
// public fun <T, A : Appendable> Iterable<T>.joinTo(buffer: A, separator: CharSequence = ", ", prefix: CharSequence = "", postfix: CharSequence = "", limit: Int = -1, truncated: CharSequence = "...", transform: ((T) -> CharSequence)? = null): A {
//     buffer.append(prefix)
//     var count = 0
//     for (element in this) {
//         if (++count > 1) buffer.append(separator)
//         if (limit < 0 || count <= limit) {
//             buffer.appendElement(element, transform)
//         } else break
//     }
//     if (limit >= 0 && count > limit) buffer.append(truncated)
//     buffer.append(postfix)
//     return buffer
// }
//
// /**
//  * Creates a string from all the elements separated using [separator] and using the given [prefix] and [postfix] if supplied.
//  *
//  * If the collection could be huge, you can specify a non-negative value of [limit], in which case only the first [limit]
//  * elements will be appended, followed by the [truncated] string (which defaults to "...").
//  *
//  * @sample samples.collections.Collections.Transformations.joinToString
//  */
// public fun <T> Iterable<T>.joinToString(separator: CharSequence = ", ", prefix: CharSequence = "", postfix: CharSequence = "", limit: Int = -1, truncated: CharSequence = "...", transform: ((T) -> CharSequence)? = null): String {
//     return joinTo(StringBuilder(), separator, prefix, postfix, limit, truncated, transform).toString()
// }
//
// /**
//  * Returns this collection as an [Iterable].
//  */
// @kotlin.internal.InlineOnly
// public inline fun <T> Iterable<T>.asIterable(): Iterable<T> {
//     return this
// }
//
// /**
//  * Creates a [Sequence] instance that wraps the original collection returning its elements when being iterated.
//  *
//  * @sample samples.collections.Sequences.Building.sequenceFromCollection
//  */
// public fun <T> Iterable<T>.asSequence(): Sequence<T> {
//     return Sequence { this.iterator() }
// }
//
// /**
//  * Returns an average value of elements in the collection.
//  */
// @kotlin.jvm.JvmName("averageOfByte")
// public fun Iterable<Byte>.average(): Double {
//     var sum: Double = 0.0
//     var count: Int = 0
//     for (element in this) {
//         sum += element
//         checkCountOverflow(++count)
//     }
//     return if (count == 0) Double.NaN else sum / count
// }
//
// /**
//  * Returns an average value of elements in the collection.
//  */
// @kotlin.jvm.JvmName("averageOfShort")
// public fun Iterable<Short>.average(): Double {
//     var sum: Double = 0.0
//     var count: Int = 0
//     for (element in this) {
//         sum += element
//         checkCountOverflow(++count)
//     }
//     return if (count == 0) Double.NaN else sum / count
// }
//
// /**
//  * Returns an average value of elements in the collection.
//  */
// @kotlin.jvm.JvmName("averageOfInt")
// public fun Iterable<Int>.average(): Double {
//     var sum: Double = 0.0
//     var count: Int = 0
//     for (element in this) {
//         sum += element
//         checkCountOverflow(++count)
//     }
//     return if (count == 0) Double.NaN else sum / count
// }
//
// /**
//  * Returns an average value of elements in the collection.
//  */
// @kotlin.jvm.JvmName("averageOfLong")
// public fun Iterable<Long>.average(): Double {
//     var sum: Double = 0.0
//     var count: Int = 0
//     for (element in this) {
//         sum += element
//         checkCountOverflow(++count)
//     }
//     return if (count == 0) Double.NaN else sum / count
// }
//
// /**
//  * Returns an average value of elements in the collection.
//  */
// @kotlin.jvm.JvmName("averageOfFloat")
// public fun Iterable<Float>.average(): Double {
//     var sum: Double = 0.0
//     var count: Int = 0
//     for (element in this) {
//         sum += element
//         checkCountOverflow(++count)
//     }
//     return if (count == 0) Double.NaN else sum / count
// }
//
// /**
//  * Returns an average value of elements in the collection.
//  */
// @kotlin.jvm.JvmName("averageOfDouble")
// public fun Iterable<Double>.average(): Double {
//     var sum: Double = 0.0
//     var count: Int = 0
//     for (element in this) {
//         sum += element
//         checkCountOverflow(++count)
//     }
//     return if (count == 0) Double.NaN else sum / count
// }
//
// /**
//  * Returns the sum of all elements in the collection.
//  */
// @kotlin.jvm.JvmName("sumOfByte")
// public fun Iterable<Byte>.sum(): Int {
//     var sum: Int = 0
//     for (element in this) {
//         sum += element
//     }
//     return sum
// }
//
// /**
//  * Returns the sum of all elements in the collection.
//  */
// @kotlin.jvm.JvmName("sumOfShort")
// public fun Iterable<Short>.sum(): Int {
//     var sum: Int = 0
//     for (element in this) {
//         sum += element
//     }
//     return sum
// }
//
// /**
//  * Returns the sum of all elements in the collection.
//  */
// @kotlin.jvm.JvmName("sumOfInt")
// public fun Iterable<Int>.sum(): Int {
//     var sum: Int = 0
//     for (element in this) {
//         sum += element
//     }
//     return sum
// }
//
// /**
//  * Returns the sum of all elements in the collection.
//  */
// @kotlin.jvm.JvmName("sumOfLong")
// public fun Iterable<Long>.sum(): Long {
//     var sum: Long = 0L
//     for (element in this) {
//         sum += element
//     }
//     return sum
// }
//
// /**
//  * Returns the sum of all elements in the collection.
//  */
// @kotlin.jvm.JvmName("sumOfFloat")
// public fun Iterable<Float>.sum(): Float {
//     var sum: Float = 0.0f
//     for (element in this) {
//         sum += element
//     }
//     return sum
// }
//
// /**
//  * Returns the sum of all elements in the collection.
//  */
// @kotlin.jvm.JvmName("sumOfDouble")
// public fun Iterable<Double>.sum(): Double {
//     var sum: Double = 0.0
//     for (element in this) {
//         sum += element
//     }
//     return sum
// }
