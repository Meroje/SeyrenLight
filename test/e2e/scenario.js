'use strict';

describe('seyrenLightApp', function() {
    it('should be blue when check success', function() {
        browser().navigateTo('/#/');
        expect(element('.check.check-color-ERROR').count()).toBe(0);
        expect(element('.check.check-color-OK').count()).toBe(1);
        expect(element('#seyrenLight').attr('style')).toBe(undefined);
    });

    it('should be red when check fails', function() {
        browser().navigateTo('/#/?view=red');
        expect(element('.check.check-color-ERROR').count()).toBe(1);
        expect(element('.check.check-color-OK').count()).toBe(0);
        expect(element('#seyrenLight').attr('style')).toBe(undefined);
    });

    it('should be background when no checks is displayed', function() {
        browser().navigateTo('/#/?view=none');
        expect(element('.check.check-color-ERROR').count()).toBe(0);
        expect(element('.check.check-color-OK').count()).toBe(0);
        expect(element('#seyrenLight').attr('style')).toMatch('image-url-or-null');
    });

    it('should be not displays check when the title containing "dev"', function() {
        browser().navigateTo('/#/?view=regexp');
        expect(element('.check.check-color-ERROR').count()).toBe(1);
        expect(element('.check.check-color-OK').count()).toBe(1);
        expect(element('#seyrenLight').attr('style')).toBe(undefined);
    });
});
