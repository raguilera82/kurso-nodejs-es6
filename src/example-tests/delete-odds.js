export const deleteOdds = (nums) => {
    return nums.filter(x => x % 2 === 0)
}